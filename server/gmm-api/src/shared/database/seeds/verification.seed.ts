import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Verification } from '@modules/verification/entities/verification.entity';
import { User } from '@modules/user/entities/user.entity';
import { AccountVerificationStatus } from '@modules/user/enums/user.enum';
import {
  VerificationStatus,
  VerificationType,
} from '@modules/verification/enum/verification.enum';

export default class VerificationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const verificationRepo = dataSource.getRepository(Verification);
    const userRepo = dataSource.getRepository(User);

    const users = await userRepo.find({
      where: {
        verificationStatus: AccountVerificationStatus.VERIFIED,
      },
    });

    const verifications = users.map((user) => ({
      userId: user.id,
      type: VerificationType.FACE_LIVENESS,
      status: VerificationStatus.APPROVED,
      extra: { sessionId: 'fake-session-id' },
    }));

    verificationRepo.save(verifications);
  }
}
