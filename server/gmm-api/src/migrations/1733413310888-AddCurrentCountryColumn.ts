import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCurrentCountryColumn1733413310888 implements MigrationInterface {
    name = 'AddCurrentCountryColumn1733413310888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "currentCountry" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "currentCountry"`);
    }

}
