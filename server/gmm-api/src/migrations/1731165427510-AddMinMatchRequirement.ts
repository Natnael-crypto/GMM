import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMinMatchRequirement1731165427510 implements MigrationInterface {
    name = 'AddMinMatchRequirement1731165427510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" ADD "minMatchRequirement" numeric(6,2) DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "minMatchRequirement"`);
    }

}
