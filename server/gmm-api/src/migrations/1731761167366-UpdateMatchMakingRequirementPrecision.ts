import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMatchMakingRequirementPrecision1731761167366 implements MigrationInterface {
    name = 'UpdateMatchMakingRequirementPrecision1731761167366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" ALTER COLUMN "minMatchRequirement" TYPE numeric(6,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" ALTER COLUMN "minMatchRequirement" TYPE numeric(5,2)`);
    }

}
