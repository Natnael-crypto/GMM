import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVerificationTable1737420471585 implements MigrationInterface {
    name = 'AddVerificationTable1737420471585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."verification_type_enum" AS ENUM('face_liveness')`);
        await queryRunner.query(`CREATE TYPE "public"."verification_status_enum" AS ENUM('not_initiated', 'pending', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "verification" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "type" "public"."verification_type_enum" NOT NULL, "status" "public"."verification_status_enum" NOT NULL DEFAULT 'not_initiated', "extra" jsonb, CONSTRAINT "PK_f7e3a90ca384e71d6e2e93bb340" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "verification" ADD CONSTRAINT "FK_8300048608d8721aea27747b07a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification" DROP CONSTRAINT "FK_8300048608d8721aea27747b07a"`);
        await queryRunner.query(`DROP TABLE "verification"`);
        await queryRunner.query(`DROP TYPE "public"."verification_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."verification_type_enum"`);
    }

}
