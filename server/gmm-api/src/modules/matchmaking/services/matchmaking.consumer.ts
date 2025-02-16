import { Processor, WorkerHost } from '@nestjs/bullmq';
import { QueueNames } from '@shared/queues';
import { MatchMakingService } from './matchmaking.service';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Processor(QueueNames.MATCH_QUEUE)
export class MatchmakerConsumer extends WorkerHost {
  private readonly logger = new Logger(MatchmakerConsumer.name);

  constructor(
    private readonly matchmakingService: MatchMakingService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'match':
        try {
          const result = await this.matchmakingService.matchUser(
            job.data.userId,
          );

          const match = result?.match;

          if (match) {
            const maleUserId = match.maleUserId;
            const femaleUserId = match.femaleUserId;

            const keys = [
              `/matchmaking/${maleUserId}`,
              `/matchmaking/${femaleUserId}`,
              `/matchmaking/matches`,
              `/users/${maleUserId}`,
              `/users/${femaleUserId}`,
              `/users/me/${maleUserId}`,
              `/users/me/${femaleUserId}`,
              `/payments/remaining-matches/${maleUserId}`,
              `/payments/remaining-matches/${femaleUserId}`,
            ];

            await Promise.all(keys.map((key) => this.cacheManager.del(key)));
          }

          this.logger.log(`JOB [${job.name} - ${job.id}] Processed`);
          return result;
        } catch (e) {
          console.log(e);
          this.logger.error(`JOB [${job.name} - ${job.id}]`, e);
        }
      default:
        break;
    }
  }
}
