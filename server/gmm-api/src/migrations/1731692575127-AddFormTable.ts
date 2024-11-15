import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFormTable1731692575127 implements MigrationInterface {
    name = 'AddFormTable1731692575127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "form_field_answer" ("value" jsonb NOT NULL, "fieldId" uuid NOT NULL, "submissionId" uuid NOT NULL, CONSTRAINT "PK_4afe18a63d63641d1d183f281de" PRIMARY KEY ("fieldId", "submissionId"))`);
        await queryRunner.query(`CREATE TYPE "public"."form_field_displaywidth_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')`);
        await queryRunner.query(`CREATE TABLE "form_field" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "placeholder" character varying, "options" jsonb, "show" character varying DEFAULT 'true', "displayWidth" "public"."form_field_displaywidth_enum" NOT NULL DEFAULT '3', "defaultValue" character varying, "minValue" character varying, "maxValue" character varying, "minLength" integer, "maxLength" integer, "order" numeric NOT NULL, "deletedAt" TIMESTAMP, "formSlug" character varying, CONSTRAINT "PK_135904ddb60085b07254ea4f485" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "title" character varying, "description" character varying, CONSTRAINT "PK_1288bfbf098df297254d5d27456" PRIMARY KEY ("slug"))`);
        await queryRunner.query(`CREATE TABLE "form_submission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "formSlug" character varying, "userId" uuid, CONSTRAINT "PK_afdf6f86e3747141dd75876e027" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "FK_153018c8fd2722718c96cbeed9a" FOREIGN KEY ("fieldId") REFERENCES "form_field"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "FK_53317b7b8123d4480ade47bd651" FOREIGN KEY ("submissionId") REFERENCES "form_submission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD CONSTRAINT "FK_1ab6ff33dd35b83ea60bd9a2c05" FOREIGN KEY ("formSlug") REFERENCES "form"("slug") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_submission" ADD CONSTRAINT "FK_663fbf3017540aa2c9eab69bfac" FOREIGN KEY ("formSlug") REFERENCES "form"("slug") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_submission" ADD CONSTRAINT "FK_df8fce71531e6d42f58b1b5470e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_submission" DROP CONSTRAINT "FK_df8fce71531e6d42f58b1b5470e"`);
        await queryRunner.query(`ALTER TABLE "form_submission" DROP CONSTRAINT "FK_663fbf3017540aa2c9eab69bfac"`);
        await queryRunner.query(`ALTER TABLE "form_field" DROP CONSTRAINT "FK_1ab6ff33dd35b83ea60bd9a2c05"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "FK_53317b7b8123d4480ade47bd651"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "FK_153018c8fd2722718c96cbeed9a"`);
        await queryRunner.query(`DROP TABLE "form_submission"`);
        await queryRunner.query(`DROP TABLE "form"`);
        await queryRunner.query(`DROP TABLE "form_field"`);
        await queryRunner.query(`DROP TYPE "public"."form_field_displaywidth_enum"`);
        await queryRunner.query(`DROP TABLE "form_field_answer"`);
    }

}
