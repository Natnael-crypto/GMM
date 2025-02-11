import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPromoCodeTable1739246538025 implements MigrationInterface {
    name = 'AddPromoCodeTable1739246538025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."promo_code_discounttype_enum" AS ENUM('PERCENT', 'AMOUNT')`);
        await queryRunner.query(`CREATE TABLE "promo_code" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "discountType" "public"."promo_code_discounttype_enum" NOT NULL DEFAULT 'AMOUNT', "discountValue" integer NOT NULL, "influencerId" uuid NOT NULL, "expiryDate" date, "maxUses" integer, "remainingUses" integer NOT NULL DEFAULT '0', "deletedAt" TIMESTAMP, CONSTRAINT "UQ_a456233366901b110f09fe478e9" UNIQUE ("code"), CONSTRAINT "PK_ded0af550884c7ab3e345e76d73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_69f39c245e256a1abe3ceebb50" ON "promo_code" ("influencerId") `);
        await queryRunner.query(`CREATE TYPE "public"."promo_code_usage_discounttype_enum" AS ENUM('PERCENT', 'AMOUNT')`);
        await queryRunner.query(`CREATE TABLE "promo_code_usage" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "promoCodeId" uuid NOT NULL, "userId" uuid NOT NULL, "discountType" "public"."promo_code_usage_discounttype_enum" NOT NULL DEFAULT 'AMOUNT', "discountValue" integer NOT NULL, "isUsed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_77444504a5348fa08ba31a75d90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_abb1e2598881264c168072d0fb" ON "promo_code_usage" ("promoCodeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0d588df749312dfcfff3730a90" ON "promo_code_usage" ("userId") `);
        await queryRunner.query(`ALTER TABLE "promo_code" ADD CONSTRAINT "FK_69f39c245e256a1abe3ceebb50f" FOREIGN KEY ("influencerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promo_code" DROP CONSTRAINT "FK_69f39c245e256a1abe3ceebb50f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0d588df749312dfcfff3730a90"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_abb1e2598881264c168072d0fb"`);
        await queryRunner.query(`DROP TABLE "promo_code_usage"`);
        await queryRunner.query(`DROP TYPE "public"."promo_code_usage_discounttype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69f39c245e256a1abe3ceebb50"`);
        await queryRunner.query(`DROP TABLE "promo_code"`);
        await queryRunner.query(`DROP TYPE "public"."promo_code_discounttype_enum"`);
    }

}
