import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFormFieldGroup1731842948228 implements MigrationInterface {
    name = 'AddFormFieldGroup1731842948228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" ADD "icon" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "icon"`);
    }

}
