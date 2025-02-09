import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, Not } from 'typeorm';

import { User } from '@modules/user/entities/user.entity';
import { Subscription } from '@modules/payment/entities/subscription.entity';
import { AccountStatus, Gender } from '@modules/user/enums/user.enum';
import { SubscriptionHistory } from '@modules/payment/entities/subscription-history.entity';
import { SubscriptionTiers } from '@modules/payment/entities/tiers';

export default class SubscriptionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const subscriptionRepo = dataSource.getRepository(Subscription);
    const subscriptionHistoryRepo =
      dataSource.getRepository(SubscriptionHistory);
    const userRepo = dataSource.getRepository(User);

    const users = await userRepo.find({
      where: {
        accountStatus: Not(AccountStatus.INCOMPLETE_REGISTRATION),
      },
    });

    const subscriptions = users.map((user) => {
      let subscription;

      const tiers = Object.keys(SubscriptionTiers).filter(
        (tier) => tier !== 'free',
      );

      if (user.gender === Gender.FEMALE) {
        if (Math.random() > 0.5) {
          subscription = SubscriptionTiers.free;
        } else {
          subscription =
            SubscriptionTiers[tiers[Math.floor(Math.random() * tiers.length)]];
        }
      } else {
        subscription =
          SubscriptionTiers[tiers[Math.floor(Math.random() * tiers.length)]];
      }

      return {
        userId: user.id,
        planId: subscription.priceId,
        status: 'succeeded',
        currentPeriodStart: new Date(),
        amount: subscription.amount,
        remainingMatches: subscription.matches,
        autoRenew: true,
        startDate: new Date(),
        endDate: new Date(),
      };
    });

    await subscriptionRepo.save(subscriptions);
    await subscriptionHistoryRepo.save(
      subscriptions.map((sub) => ({ ...sub, periodStart: new Date() })),
    );
  }
}
