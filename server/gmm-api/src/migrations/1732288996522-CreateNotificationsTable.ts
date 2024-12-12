import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationsTable1732288996522 implements MigrationInterface {
    name = 'CreateNotificationsTable1732288996522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "recipientId" character varying NOT NULL, "initiatorUserId" character varying, "title" character varying NOT NULL, "message" text NOT NULL, "url" character varying, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
