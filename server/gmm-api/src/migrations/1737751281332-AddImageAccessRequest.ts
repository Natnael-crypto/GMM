import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageAccessRequest1737751281332 implements MigrationInterface {
    name = 'AddImageAccessRequest1737751281332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."image_access_request_status_enum" AS ENUM('Pending', 'Accepted', 'Rejected')`);
        await queryRunner.query(`CREATE TABLE "image_access_request" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "matchId" uuid NOT NULL, "status" "public"."image_access_request_status_enum" NOT NULL DEFAULT 'Pending', CONSTRAINT "REL_9ef26f88a2e2d3141fb9af8900" UNIQUE ("matchId"), CONSTRAINT "PK_8ef7dee846913f71005929500f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image_access_request" ADD CONSTRAINT "FK_9ef26f88a2e2d3141fb9af89000" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image_access_request" DROP CONSTRAINT "FK_9ef26f88a2e2d3141fb9af89000"`);
        await queryRunner.query(`DROP TABLE "image_access_request"`);
        await queryRunner.query(`DROP TYPE "public"."image_access_request_status_enum"`);
    }

}
