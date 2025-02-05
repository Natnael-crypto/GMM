import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserIdColumn1738782961475 implements MigrationInterface {
    name = 'RenameUserIdColumn1738782961475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`);
        await queryRunner.query(`ALTER TABLE "subscription_history" DROP CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "subscription_history" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription_history" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription_history" ADD CONSTRAINT "FK_bfbe390118678d2ce21103acfd7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription_history" DROP CONSTRAINT "FK_bfbe390118678d2ce21103acfd7"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84"`);
        await queryRunner.query(`ALTER TABLE "subscription_history" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription_history" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "subscription_history" ADD CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
