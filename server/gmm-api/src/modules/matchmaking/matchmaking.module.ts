import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Preference } from './entities/preference.entity';
import { MatchMakingController } from './controllers/matchmaking.controller';
import { MatchMakingService } from './services/matchmaking.service';
import { UserModule } from '@modules/user/user.module';
import { PaymentsModule } from '@modules/payment/payment.module';
import { MatchPool } from './entities/match-pool.entity';
import { InvitationToMatchStage } from './entities/invitation-to-match-stage.entity';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { ImageAccessRequestService } from './services/image-request.service';
import { ImageAccessRequest } from './entities/image-access-request.entity';
import { NoticeModule } from '@modules/notice/notice.module';
import { BullModule } from '@nestjs/bullmq';
import { QueueNames } from '@shared/queues';
import { MatchmakerConsumer } from './services/matchmaking.consumer';
import { FormModule } from '@modules/form/form.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Match,
      Preference,
      MatchPool,
      InvitationToMatchStage,
      ImageAccessRequest,
    ]),
    BullModule.registerQueue({
      name: QueueNames.MATCH_QUEUE,
    }),
    UserModule,
    PaymentsModule,
    NotificationsModule,
    FormModule,
    NoticeModule.forRootAsync(),
  ],
  controllers: [MatchMakingController],
  providers: [
    MatchMakingService,
    ImageAccessRequestService,
    MatchmakerConsumer,
  ],
  exports: [TypeOrmModule, MatchMakingService],
})
export class MatchMakingModule {}
