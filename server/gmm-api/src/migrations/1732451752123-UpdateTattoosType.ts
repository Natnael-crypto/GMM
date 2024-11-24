import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTattoosType1732451752123 implements MigrationInterface {
    name = 'UpdateTattoosType1732451752123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "tattoos"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "tattoos" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tattoos"`);
        await queryRunner.query(`CREATE TYPE "public"."user_tattoos_enum" AS ENUM('None', 'Minimal, not visible', 'Small, visible or concealed', 'Large or multiple tattoos', 'Doesn’t matter')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "tattoos" "public"."user_tattoos_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tattoos"`);
        await queryRunner.query(`DROP TYPE "public"."user_tattoos_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "tattoos" boolean`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "tattoos"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "tattoos" boolean`);
    }

}
