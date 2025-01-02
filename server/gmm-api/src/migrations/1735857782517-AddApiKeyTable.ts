import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApiKeyTable1735857782517 implements MigrationInterface {
    name = 'AddApiKeyTable1735857782517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`);
        await queryRunner.query(`ALTER TABLE "subscription_history" DROP CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f"`);
        await queryRunner.query(`ALTER TABLE "guardian_request" DROP CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac"`);
        await queryRunner.query(`CREATE TABLE "api_key" ("id" SERIAL NOT NULL, "prefix" character varying NOT NULL, "api_key_hash" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription_history" ADD CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f" FOREIGN KEY ("guardianId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guardian_request" ADD CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guardian_request" DROP CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f"`);
        await queryRunner.query(`ALTER TABLE "subscription_history" DROP CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "api_key"`);
        await queryRunner.query(`ALTER TABLE "guardian_request" ADD CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f" FOREIGN KEY ("guardianId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription_history" ADD CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
