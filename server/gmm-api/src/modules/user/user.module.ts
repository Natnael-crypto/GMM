import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Match } from '@modules/matchmaking/entities/match.entity';
import { Preference } from '@modules/matchmaking/entities/preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Match, Preference])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}

export enum EMAIL_LISTS_ID {
  All_Registered_Users = 'All Users',
}
