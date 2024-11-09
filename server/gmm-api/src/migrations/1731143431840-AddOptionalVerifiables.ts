import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOptionalVerifiables1731143431840 implements MigrationInterface {
    name = 'AddOptionalVerifiables1731143431840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_optional_verifiable" ("userId" uuid NOT NULL, "annualIncome" boolean, "annualTaxReport" boolean, "fullCreditReport" boolean, "drivingRecord" boolean, "nationality" boolean, "stdTesting" boolean, "criminalBackgroundCheck" boolean, "divorced" boolean, "custodyAndParentingArrangements" boolean, CONSTRAINT "PK_1ba5f906121eaaeda27ea550a43" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "user_optional_verifiable" ADD CONSTRAINT "FK_1ba5f906121eaaeda27ea550a43" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_optional_verifiable" DROP CONSTRAINT "FK_1ba5f906121eaaeda27ea550a43"`);
        await queryRunner.query(`DROP TABLE "user_optional_verifiable"`);
    }

}
