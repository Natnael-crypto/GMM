import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUnusedFieldFromLocationEntities1733583039670 implements MigrationInterface {
    name = 'RemoveUnusedFieldFromLocationEntities1733583039670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "state" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "state" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "state" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "country" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "country" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "city" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "city" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
