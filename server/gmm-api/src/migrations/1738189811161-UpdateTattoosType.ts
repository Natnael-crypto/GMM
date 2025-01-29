import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTattoosType1738189811161 implements MigrationInterface {
    name = 'UpdateTattoosType1738189811161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tattoos"`);
        await queryRunner.query(`DROP TYPE "public"."user_tattoos_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "tattoos" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tattoos"`);
        await queryRunner.query(`CREATE TYPE "public"."user_tattoos_enum" AS ENUM('None', 'Minimal, not visible', 'Small, visible or concealed', 'Large or multiple tattoos', 'Doesn’t matter')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "tattoos" "public"."user_tattoos_enum"`);
    }

}
