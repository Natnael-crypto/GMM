import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrimaryColumnOnFormFieldAnswer1731767228740 implements MigrationInterface {
    name = 'AddPrimaryColumnOnFormFieldAnswer1731767228740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "PK_4afe18a63d63641d1d183f281de"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "PK_1dd20518043cebcb89627e30d3b" PRIMARY KEY ("fieldId", "submissionId", "id")`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "FK_153018c8fd2722718c96cbeed9a"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "FK_53317b7b8123d4480ade47bd651"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "PK_1dd20518043cebcb89627e30d3b"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "PK_6397196b983bf65aa680c8eaafb" PRIMARY KEY ("submissionId", "id")`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "PK_6397196b983bf65aa680c8eaafb"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "PK_3a6d80b952b923b4df6b3340072" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "UQ_4afe18a63d63641d1d183f281de" UNIQUE ("fieldId", "submissionId")`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "FK_153018c8fd2722718c96cbeed9a" FOREIGN KEY ("fieldId") REFERENCES "form_field"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "FK_53317b7b8123d4480ade47bd651" FOREIGN KEY ("submissionId") REFERENCES "form_submission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "FK_53317b7b8123d4480ade47bd651"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "FK_153018c8fd2722718c96cbeed9a"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "UQ_4afe18a63d63641d1d183f281de"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "PK_3a6d80b952b923b4df6b3340072"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "PK_6397196b983bf65aa680c8eaafb" PRIMARY KEY ("submissionId", "id")`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "PK_6397196b983bf65aa680c8eaafb"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "PK_1dd20518043cebcb89627e30d3b" PRIMARY KEY ("fieldId", "submissionId", "id")`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "FK_53317b7b8123d4480ade47bd651" FOREIGN KEY ("submissionId") REFERENCES "form_submission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "FK_153018c8fd2722718c96cbeed9a" FOREIGN KEY ("fieldId") REFERENCES "form_field"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP CONSTRAINT "PK_1dd20518043cebcb89627e30d3b"`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" ADD CONSTRAINT "PK_4afe18a63d63641d1d183f281de" PRIMARY KEY ("fieldId", "submissionId")`);
        await queryRunner.query(`ALTER TABLE "form_field_answer" DROP COLUMN "id"`);
    }

}
