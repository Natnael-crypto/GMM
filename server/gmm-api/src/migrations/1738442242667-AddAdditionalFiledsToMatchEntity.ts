import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdditionalFiledsToMatchEntity1738442242667 implements MigrationInterface {
    name = 'AddAdditionalFiledsToMatchEntity1738442242667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ADD "allowMatchedUserView" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "match" ADD "allowChatView" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "allowChatView"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "allowMatchedUserView"`);
    }

}
