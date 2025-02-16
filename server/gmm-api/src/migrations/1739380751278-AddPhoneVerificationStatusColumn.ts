import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhoneVerificationStatusColumn1739380751278
  implements MigrationInterface
{
  name = 'AddPhoneVerificationStatusColumn1739380751278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_phoneverificationstatus_enum" AS ENUM('Verified', 'Unverified')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phoneVerificationStatus" "public"."user_phoneverificationstatus_enum" NOT NULL DEFAULT 'Unverified'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "phoneVerificationStatus"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."user_phoneverificationstatus_enum"`,
    );
  }
}
