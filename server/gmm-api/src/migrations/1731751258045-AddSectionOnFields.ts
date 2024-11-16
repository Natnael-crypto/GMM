import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSectionOnFields1731751258045 implements MigrationInterface {
    name = 'AddSectionOnFields1731751258045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" ADD "section" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "section"`);
    }

}
