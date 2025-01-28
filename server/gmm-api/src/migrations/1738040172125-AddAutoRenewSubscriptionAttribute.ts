import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAutoRenewSubscriptionAttribute1738040172125 implements MigrationInterface {
    name = 'AddAutoRenewSubscriptionAttribute1738040172125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "receiptUrl" TO "autoRenew"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "autoRenew"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "autoRenew" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "autoRenew"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "autoRenew" character varying`);
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "autoRenew" TO "receiptUrl"`);
    }

}
