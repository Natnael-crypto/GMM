import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSucbscriptionRecieptUrlColumn1736324972821 implements MigrationInterface {
    name = 'AddSucbscriptionRecieptUrlColumn1736324972821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "receiptUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "subscription_history" ADD "receiptUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription_history" DROP COLUMN "receiptUrl"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "receiptUrl"`);
    }

}
