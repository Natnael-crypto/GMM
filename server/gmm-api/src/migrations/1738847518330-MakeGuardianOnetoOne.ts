import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeGuardianOnetoOne1738847518330 implements MigrationInterface {
    name = 'MakeGuardianOnetoOne1738847518330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_594831c3a3e1f588afcb4f2ed4f" UNIQUE ("guardianId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f" FOREIGN KEY ("guardianId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_594831c3a3e1f588afcb4f2ed4f"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f" FOREIGN KEY ("guardianId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
