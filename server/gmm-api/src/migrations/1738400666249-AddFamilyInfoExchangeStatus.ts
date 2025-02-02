import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFamilyInfoExchangeStatus1738400666249 implements MigrationInterface {
    name = 'AddFamilyInfoExchangeStatus1738400666249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."match_familyinformationexchangestatus_enum" AS ENUM('None', 'Exchanged')`);
        await queryRunner.query(`ALTER TABLE "match" ADD "familyInformationExchangeStatus" "public"."match_familyinformationexchangestatus_enum" NOT NULL DEFAULT 'None'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "familyInformationExchangeStatus"`);
        await queryRunner.query(`DROP TYPE "public"."match_familyinformationexchangestatus_enum"`);
    }

}
