import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFormFieldGroup1731842785460 implements MigrationInterface {
    name = 'AddFormFieldGroup1731842785460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" ADD "group" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "group"`);
    }

}
