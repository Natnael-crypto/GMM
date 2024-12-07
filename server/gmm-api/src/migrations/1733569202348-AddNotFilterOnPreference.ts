import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotFilterOnPreference1733569202348 implements MigrationInterface {
    name = 'AddNotFilterOnPreference1733569202348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" ADD "notNationality" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notLanguage" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notCountry" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notCity" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notCountryOfOrigin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notMartialStatus" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notReligiousPractice" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notBornOrRevert" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notNumberOfChildren" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notHijab" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notChildren" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notWantsChildren" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notEducation" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notProfession" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notTattoos" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notTattoos"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notProfession"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notEducation"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notWantsChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notHijab"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notNumberOfChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notBornOrRevert"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notReligiousPractice"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notMartialStatus"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notCountryOfOrigin"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notCity"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notCountry"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notLanguage"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notNationality"`);
    }

}
