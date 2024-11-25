import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDisplayTemplate1732574190818 implements MigrationInterface {
    name = 'AddDisplayTemplate1732574190818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "group"`);
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "form" ADD "displayTemplate" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" DROP COLUMN "displayTemplate"`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD "icon" character varying`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD "group" character varying`);
    }

}
