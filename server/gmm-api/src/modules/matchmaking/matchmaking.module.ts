import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Preference } from './entities/preference.entity';
import { MatchMakingController } from './controllers/matchmaking.controller';
import { MatchMakingService } from './services/matchmaking.service';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Preference]), UserModule],
  controllers: [MatchMakingController],
  providers: [MatchMakingService],
  exports: [TypeOrmModule],
})
export class MatchMakingModule {}
