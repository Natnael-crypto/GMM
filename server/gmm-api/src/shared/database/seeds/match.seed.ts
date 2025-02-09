import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { AccountStatus, Gender } from '@modules/user/enums/user.enum';
import { Match } from '@modules/matchmaking/entities/match.entity';
import { FamilyInformationExchangeStatus } from '@modules/matchmaking/enums/family-information-exchange-status.enum';
import {
  InvitationToMatchStageStatus,
  MatchStage,
} from '@modules/matchmaking/enums/matchmaking.enum';
import { InvitationToMatchStage } from '@modules/matchmaking/entities/invitation-to-match-stage.entity';
import { MatchPool } from '@modules/matchmaking/entities/match-pool.entity';

export default class MatchSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const matchRepo = dataSource.getRepository(Match);
    const matchPoolRepo = dataSource.getRepository(MatchPool);
    const invitationRepo = dataSource.getRepository(InvitationToMatchStage);
    const userRepo = dataSource.getRepository(User);

    const maleUsers = await userRepo.find({
      where: {
        accountStatus: AccountStatus.APPROVED,
        gender: Gender.MALE,
      },
      take: 3,
    });

    const femaleUsers = await userRepo.find({
      where: {
        accountStatus: AccountStatus.APPROVED,
        gender: Gender.FEMALE,
      },
      take: 3,
    });

    const matches = await matchRepo.save([
      {
        maleUserId: maleUsers[0].id,
        femaleUserId: femaleUsers[0].id,
        isActive: true,
        allowChatView: false,
        allowMatchedUserView: false,
        familyInformationExchangeStatus: FamilyInformationExchangeStatus.NONE,
        createdAt: new Date(),
        stage: MatchStage.BASIC_INFORMATION,
      },
      {
        maleUserId: maleUsers[1].id,
        femaleUserId: femaleUsers[1].id,
        isActive: true,
        allowChatView: false,
        allowMatchedUserView: false,
        familyInformationExchangeStatus: FamilyInformationExchangeStatus.NONE,
        createdAt: new Date(),
        stage: MatchStage.FAMILY_INTRODUCTION,
      },
    ]);

    await invitationRepo.save([
      {
        inviterId: maleUsers[0].id,
        matchId: matches[1].id,
        status: InvitationToMatchStageStatus.ACCEPTED,
        sentAt: new Date(),
        acceptedOrRejectedAt: new Date(),
      },
    ]);

    console.log(
      `[MatchSeeder] ${maleUsers[0].email} and ${femaleUsers[0].email} matched`,
    );
    console.log(
      `[MatchSeeder] ${maleUsers[1].email} and ${femaleUsers[1].email} matched`,
    );

    await matchPoolRepo.save([
      {
        userId: maleUsers[2].id,
      },
      {
        userId: femaleUsers[2].id,
      },
    ]);

    console.log(
      `[MatchSeeder] ${maleUsers[2].email}, ${femaleUsers[2].email} added to match pool`,
    );
  }
}
