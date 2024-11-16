import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOrderToIntegerType1731738775390 implements MigrationInterface {
    name = 'ChangeOrderToIntegerType1731738775390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD "order" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "form_submission" DROP CONSTRAINT "FK_663fbf3017540aa2c9eab69bfac"`);
        await queryRunner.query(`ALTER TABLE "form_submission" DROP CONSTRAINT "FK_df8fce71531e6d42f58b1b5470e"`);
        await queryRunner.query(`ALTER TABLE "form_submission" ALTER COLUMN "formSlug" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form_submission" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form_submission" ADD CONSTRAINT "FK_663fbf3017540aa2c9eab69bfac" FOREIGN KEY ("formSlug") REFERENCES "form"("slug") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_submission" ADD CONSTRAINT "FK_df8fce71531e6d42f58b1b5470e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_submission" DROP CONSTRAINT "FK_df8fce71531e6d42f58b1b5470e"`);
        await queryRunner.query(`ALTER TABLE "form_submission" DROP CONSTRAINT "FK_663fbf3017540aa2c9eab69bfac"`);
        await queryRunner.query(`ALTER TABLE "form_submission" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form_submission" ALTER COLUMN "formSlug" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form_submission" ADD CONSTRAINT "FK_df8fce71531e6d42f58b1b5470e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_submission" ADD CONSTRAINT "FK_663fbf3017540aa2c9eab69bfac" FOREIGN KEY ("formSlug") REFERENCES "form"("slug") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_field" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "form_field" ADD "order" numeric NOT NULL`);
    }

}
