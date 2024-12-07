import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePreferenceFields1733558760990 implements MigrationInterface {
    name = 'UpdatePreferenceFields1733558760990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "salat"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "countryOfOrigin" text`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "religiousPractice" text`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "drugs" boolean`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "numberOfChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "numberOfChildren" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "tattoos"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "tattoos" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "tattoos"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "tattoos" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "numberOfChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "numberOfChildren" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "drugs"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "religiousPractice"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "countryOfOrigin"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "salat" text`);
    }

}
