import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeShowFieldToJSON1731801867538 implements MigrationInterface {
    name = 'ChangeShowFieldToJSON1731801867538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" DROP CONSTRAINT "FK_1ab6ff33dd35b83ea60bd9a2c05"`);
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "show"`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD "show" jsonb`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD CONSTRAINT "FK_1ab6ff33dd35b83ea60bd9a2c05" FOREIGN KEY ("formSlug") REFERENCES "form"("slug") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" DROP CONSTRAINT "FK_1ab6ff33dd35b83ea60bd9a2c05"`);
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "show"`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD "show" character varying DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD CONSTRAINT "FK_1ab6ff33dd35b83ea60bd9a2c05" FOREIGN KEY ("formSlug") REFERENCES "form"("slug") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
