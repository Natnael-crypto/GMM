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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Match, Preference, GuardianRequest]),
    NoticeModule.forRootAsync({
      listsProvider: UserService,
      listsImports: [UserModule],
      envTransport: 'EMAIL_SMTP_CONNECTION',
      from: 'betabravah@gmail.com',
    }),
  ],
  controllers: [UserController, GuardianController],
  providers: [UserService, GuardianService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}

export enum EMAIL_LISTS_ID {
  All_Registered_Users = 'All Users',
}
