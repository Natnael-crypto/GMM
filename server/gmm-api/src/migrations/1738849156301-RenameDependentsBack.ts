import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameDependentsBack1738849156301 implements MigrationInterface {
    name = 'RenameDependentsBack1738849156301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "options"`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD "options" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "options"`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD "options" json`);
    }

}
