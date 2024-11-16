import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMatchmakingFieldsOnUser1731759031939 implements MigrationInterface {
    name = 'AddMatchmakingFieldsOnUser1731759031939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" ADD "label" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "salat" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hijab" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "children" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "wantsChildren" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "education" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profession" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profession"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "wantsChildren"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "children"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hijab"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salat"`);
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "label"`);
    }

}
