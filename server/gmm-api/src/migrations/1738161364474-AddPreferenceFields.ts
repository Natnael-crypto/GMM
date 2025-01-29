import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPreferenceFields1738161364474 implements MigrationInterface {
    name = 'AddPreferenceFields1738161364474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notNumberOfChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notWantsChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notProfession"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "numberOfChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "wantsChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "profession"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salat"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "wantsChildren"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profession"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notEmploymentType" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "employmentType" text`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notSalah" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "salah" text`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notBeard" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "beard" text`);
        await queryRunner.query(`ALTER TABLE "user" ADD "salah" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "beard" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "employmentType" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "employmentType"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "beard"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salah"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "beard"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notBeard"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "salah"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notSalah"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "employmentType"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "notEmploymentType"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profession" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "wantsChildren" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "salat" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "profession" text`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "wantsChildren" text`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "numberOfChildren" text`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notProfession" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notWantsChildren" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "notNumberOfChildren" boolean NOT NULL DEFAULT false`);
    }

}
