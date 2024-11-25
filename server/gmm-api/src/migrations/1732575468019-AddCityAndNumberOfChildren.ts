import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCityAndNumberOfChildren1732575468019 implements MigrationInterface {
    name = 'AddCityAndNumberOfChildren1732575468019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" ADD "city" text`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "numberOfChildren" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "numberOfChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "city"`);
    }

}
