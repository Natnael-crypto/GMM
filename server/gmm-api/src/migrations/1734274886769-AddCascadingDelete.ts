import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadingDelete1734274886769 implements MigrationInterface {
  name = 'AddCascadingDelete1734274886769';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop existing foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_history" DROP CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guardian_request" DROP CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac"`,
    );

    // Add new foreign key constraints with the desired cascade behavior
    await queryRunner.query(`
                ALTER TABLE "subscriptions" 
                ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" 
                FOREIGN KEY ("user_id") REFERENCES "user"("id") 
                ON DELETE CASCADE ON UPDATE NO ACTION
            `);

    await queryRunner.query(`
                ALTER TABLE "subscription_history" 
                ADD CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09" 
                FOREIGN KEY ("user_id") REFERENCES "user"("id") 
                ON DELETE CASCADE ON UPDATE NO ACTION
            `);

    await queryRunner.query(`
                ALTER TABLE "user" 
                ADD CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f" 
                FOREIGN KEY ("guardianId") REFERENCES "user"("id") 
                ON DELETE CASCADE ON UPDATE NO ACTION
            `);

    await queryRunner.query(`
                ALTER TABLE "guardian_request" 
                ADD CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac" 
                FOREIGN KEY ("userId") REFERENCES "user"("id") 
                ON DELETE CASCADE ON UPDATE NO ACTION
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert to the previous behavior (no cascade)
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_history" DROP CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guardian_request" DROP CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac"`,
    );

    // Re-add the old constraints without cascade
    await queryRunner.query(`
                ALTER TABLE "subscriptions" 
                ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" 
                FOREIGN KEY ("user_id") REFERENCES "user"("id") 
                ON DELETE NO ACTION ON UPDATE NO ACTION
            `);

    await queryRunner.query(`
                ALTER TABLE "subscription_history" 
                ADD CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09" 
                FOREIGN KEY ("user_id") REFERENCES "user"("id") 
                ON DELETE NO ACTION ON UPDATE NO ACTION
            `);

    await queryRunner.query(`
                ALTER TABLE "user" 
                ADD CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f" 
                FOREIGN KEY ("guardianId") REFERENCES "user"("id") 
                ON DELETE NO ACTION ON UPDATE NO ACTION
            `);

    await queryRunner.query(`
                ALTER TABLE "guardian_request" 
                ADD CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac" 
                FOREIGN KEY ("userId") REFERENCES "user"("id") 
                ON DELETE NO ACTION ON UPDATE NO ACTION
            `);
  }
}
