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
import {
  UserWorldlyLifestyle,
  MaleIslamicLifestyle,
  MaleExpectedWorldlyLifestyle,
  FemaleExpectedWorldlyLifestyle,
  MaleExpectedIslamicLifestyle,
  FemaleExpectedIslamicLifestyle,
  FemaleIslamicLifestyle,
  UserMarriageDiscussion,
  UserOptionalVerifiable,
  UserFamilyInformation,
} from '@modules/user/entities';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserWorldlyLifestyle,
      MaleExpectedWorldlyLifestyle,
      FemaleExpectedWorldlyLifestyle,
      MaleIslamicLifestyle,
      MaleExpectedIslamicLifestyle,
      FemaleIslamicLifestyle,
      FemaleExpectedIslamicLifestyle,
      UserMarriageDiscussion,
      UserFamilyInformation,
      UserOptionalVerifiable,
      Match,
      Preference,
      GuardianRequest,
    ]),
    NoticeModule.forRootAsync(),
  ],
  controllers: [UserController, GuardianController],
  providers: [GuardianService, UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}

export enum EMAIL_LISTS_ID {
  All_Registered_Users = 'All Users',
}
