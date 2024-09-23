import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Match } from '@modules/matchmaking/entities/match.entity';
import { Preference } from '@modules/matchmaking/entities/preference.entity';
import { GuardianRequest } from './entities/guardian-request.entity';
import { GuardianController } from './controllers/guardian.controller';
import { GuardianService } from './services/guardian.service';
import { NoticeModule } from '@modules/notice/notice.module';
import { NoticeService } from '@modules/notice/services/notice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Match, Preference, GuardianRequest]),
    NoticeModule,
  ],
  controllers: [UserController, GuardianController],
  providers: [
    GuardianService,
    NoticeService,
    {
      provide: 'EMAIL_LISTS_PROVIDER',
      useValue: {
        getList: async (emailListID: string) => {
          // Logic to fetch email list by ID

          return [];
        },
      },
    },
    UserService,
  ],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}

export enum EMAIL_LISTS_ID {
  All_Registered_Users = 'All Users',
}
