import { MatchMakingService } from '../gmm-api/src/modules/matchmaking/services/matchmaking.service';
import { PaymentsService } from '../gmm-api/src/modules/payment/services/payment.service';
import { User } from '../gmm-api/src/modules/user/entities/user.entity';
import { Match } from '../gmm-api/src/modules/matchmaking/entities/match.entity';
import { MatchPool } from '../gmm-api/src/modules/matchmaking/entities/match-pool.entity';
import { Subscription } from '../gmm-api/src/modules/payment/entities/subscription.entity';

describe('Matchmaking Transaction and Atomicity', () => {
  let databaseState: {
    subscriptions: Record<string, any>;
  };
  let transactionBackup: any = null;

  let mockDataSource: any;
  let mockRequest: any;
  let mockNotificationService: any;
  let mockUserService: any;
  let mockNoticeService: any;
  let mockFormService: any;
  let mockQueue: any;
  let mockConfigService: any;
  let mockEventEmitter: any;
  let mockSchedulerService: any;
  let mockPromoCodeService: any;

  beforeEach(() => {
    // Reset virtual database state before each test
    databaseState = {
      subscriptions: {
        'male-user-id': {
          id: 'sub-1',
          userId: 'male-user-id',
          remainingMatches: 5,
          status: 'succeeded',
        },
        'female-user-id': {
          id: 'sub-2',
          userId: 'female-user-id',
          remainingMatches: 0, // Out of matches!
          status: 'succeeded',
        },
      },
    };
    transactionBackup = null;

    // Set up request context mock
    mockRequest = {};

    // Mock notification and external services
    mockNotificationService = {
      send: jest.fn().mockResolvedValue(true),
    };
    mockUserService = {
      getUserById: jest.fn().mockImplementation((id) =>
        Promise.resolve({
          id,
          firstName: id === 'male-user-id' ? 'John' : 'Jane',
          gender: id === 'male-user-id' ? 'Male' : 'Female',
        }),
      ),
    };
    mockNoticeService = {
      sendFamilyInformationEmail: jest.fn().mockResolvedValue(true),
    };
    mockFormService = {};
    mockQueue = {
      add: jest.fn().mockResolvedValue(true),
    };
    mockConfigService = {
      get: jest.fn().mockReturnValue({ apiKey: 'mock-stripe-key' }),
    };
    mockEventEmitter = {
      emit: jest.fn(),
      emitAsync: jest.fn().mockResolvedValue(true),
    };
    mockSchedulerService = {};
    mockPromoCodeService = {};

    // Mock DataSource with transactional and non-transactional entity managers
    mockDataSource = {
      manager: {
        transaction: jest.fn().mockImplementation(async (runInTransaction) => {
          // Backup the DB state for rollback Simulation
          transactionBackup = JSON.parse(JSON.stringify(databaseState));

          const transactionalManager = {
            getRepository: jest.fn().mockImplementation((entityCls) => {
              if (entityCls === User) {
                return {
                  findOne: jest.fn().mockImplementation(({ where }) => {
                    return Promise.resolve({ id: where.id, firstName: 'Mock', gender: where.id === 'male-user-id' ? 'Male' : 'Female' });
                  }),
                };
              }
              if (entityCls === Subscription) {
                return {
                  findOne: jest.fn().mockImplementation(({ where }) => {
                    const userId = where.user?.id || where.userId;
                    return Promise.resolve(databaseState.subscriptions[userId]);
                  }),
                  save: jest.fn().mockImplementation((sub) => {
                    databaseState.subscriptions[sub.userId] = { ...sub };
                    return Promise.resolve(sub);
                  }),
                };
              }
              if (entityCls === Match) {
                return {
                  save: jest.fn().mockImplementation((match) => Promise.resolve({ id: 'match-id', ...match })),
                };
              }
              if (entityCls === MatchPool) {
                return {
                  delete: jest.fn().mockResolvedValue(true),
                };
              }
            }),
          };

          try {
            const result = await runInTransaction(transactionalManager);
            transactionBackup = null;
            return result;
          } catch (error) {
            // ROLLBACK: Restore original database state
            databaseState = transactionBackup;
            transactionBackup = null;
            throw error;
          }
        }),
        getRepository: jest.fn().mockImplementation((entityCls) => {
          if (entityCls === User) {
            return {
              findOne: jest.fn().mockImplementation(({ where }) => {
                return Promise.resolve({ id: where.id, firstName: 'Mock', gender: where.id === 'male-user-id' ? 'Male' : 'Female' });
              }),
            };
          }
          if (entityCls === Subscription) {
            return {
              findOne: jest.fn().mockImplementation(({ where }) => {
                const userId = where.user?.id || where.userId;
                return Promise.resolve(databaseState.subscriptions[userId]);
              }),
              save: jest.fn().mockImplementation((sub) => {
                databaseState.subscriptions[sub.userId] = { ...sub };
                return Promise.resolve(sub);
              }),
            };
          }
          if (entityCls === Match) {
            return {
              save: jest.fn().mockImplementation((match) => Promise.resolve({ id: 'match-id', ...match })),
            };
          }
          if (entityCls === MatchPool) {
            return {
              delete: jest.fn().mockResolvedValue(true),
            };
          }
        }),
      },
    };
  });

  it('should demonstrate the transactional and atomicity requirements during matchmaking', async () => {
    // Instantiate PaymentsService
    const paymentService = new PaymentsService(
      mockConfigService,
      mockUserService,
      mockNoticeService,
      mockEventEmitter,
      mockSchedulerService,
      mockPromoCodeService,
      mockRequest,
      mockDataSource,
      mockDataSource.manager.getRepository(User),
      mockDataSource.manager.getRepository(Subscription),
      {} as any,
    );

    // Instantiate MatchMakingService
    const matchmakingService = new MatchMakingService(
      paymentService as any,
      mockNotificationService,
      mockUserService,
      mockNoticeService,
      mockFormService,
      mockQueue,
      mockRequest,
      mockDataSource,
    );

    const maleUser = { id: 'male-user-id', gender: 'Male' } as any;
    const femaleUserId = 'female-user-id';

    // The matchmaking assignment should fail because the female user is out of matches.
    await expect(
      matchmakingService.assignMatch(maleUser, femaleUserId)
    ).rejects.toThrow();

    // Since the operation failed, the male user's remaining matches MUST remain at 5 (fully rolled back/atomic).
    expect(databaseState.subscriptions['male-user-id'].remainingMatches).toBe(5);
  });
});
