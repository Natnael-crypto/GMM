import { Processor, WorkerHost } from '@nestjs/bullmq';
import { QueueNames } from '@shared/queues';
import { MatchMakingService } from './matchmaking.service';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor(QueueNames.MATCH_QUEUE)
export class MatchmakerConsumer extends WorkerHost {
  private readonly logger = new Logger(MatchmakerConsumer.name);

  constructor(private readonly matchmakingService: MatchMakingService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'match':
        try {
          const result = await this.matchmakingService.matchUser(
            job.data.userId,
          );

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
