import { MigrationInterface, QueryRunner } from "typeorm";

export class AddContactMessage1739564833577 implements MigrationInterface {
    name = 'AddContactMessage1739564833577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contact_message_status_enum" AS ENUM('NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')`);
        await queryRunner.query(`CREATE TABLE "contact_message" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "email" character varying NOT NULL, "message" text NOT NULL, "status" "public"."contact_message_status_enum" NOT NULL DEFAULT 'NEW', "issueId" character varying NOT NULL, CONSTRAINT "PK_1476ca9a6265a586f618ea918fd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact_message"`);
        await queryRunner.query(`DROP TYPE "public"."contact_message_status_enum"`);
    }

}
