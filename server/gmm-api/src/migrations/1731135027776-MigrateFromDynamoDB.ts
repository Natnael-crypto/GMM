import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateFromDynamoDB1731135027776 implements MigrationInterface {
    name = 'MigrateFromDynamoDB1731135027776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "male_expected_worldly_lifestyle" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "decisionMakingAndLeadership" character varying, "willFinanciallySupportWifeEducation" character varying, "moneyInMarriage" character varying, "roleOfWife" character varying, "wifeRelocation" character varying, "jointFamily" character varying, "wifeOpenToLiveWithHusbandsParents" character varying, "haveTheirHomeSeparateFromTheirFamilies" character varying, "husbandOpenToLiveWithWifeFamily" character varying, "acceptHusbandsChildren" character varying, "acceptWifesChildren" character varying, "havingChildren" character varying, "desiredNumberOfChildren" character varying, "parenthoodTimingAfterMarriage" character varying, CONSTRAINT "PK_80014bdb1536b5d45a3d56921d3" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "female_expected_worldly_lifestyle" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "decisionMakingAndLeadership" character varying, "moneyInMarriage" character varying, "willFinanciallySupportWifeEducation" character varying, "husbandRelocation" character varying, "jointFamily" character varying, "husbandMustLiveAloneWithWife" character varying, "husbandWillingToLiveWithWifeFamily" character varying, "acceptWifesChildren" character varying, "acceptHusbandsChildren" character varying, "havingChildren" character varying, "desiredNumberOfChildren" character varying, "parenthoodTimingAfterMarriage" character varying, CONSTRAINT "PK_96004613c3abe94a416e42a4597" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "user_worldly_lifestyle" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "employmentType" character varying, "annualIncome" character varying, "annualIncomeCurrency" character varying, "currentOccupationTitle" character varying, "typeOfResidence" character varying, "livingSituation" character varying, "ownsVehicle" character varying, "vehicleYear" integer, "vehicleMake" character varying, "vehicleModel" character varying, "educationQualification" character varying, "applicableDebts" character varying, "currentDebts" text, "approximateDebt" character varying, "approximateDebtCurrency" character varying, "payingInterestOnDebts" character varying, "presentFamilyMembers" character varying, "numberOfSiblings" integer, "pets" character varying, "majorPreexistingHealthCondition" character varying, "mobilityAssistantRequirement" character varying, "preexistingHealthConditionDescription" character varying, CONSTRAINT "PK_a7c6d18c251c7e285c158458bc1" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "male_expected_islamic_lifestyle" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "salat" character varying, "obedience" character varying, "hijab" character varying, "appearance" character varying, "polygyny" character varying, "islamicEducation" character varying, "socialMedia" character varying, "wifeNonMehramContact" character varying, "husbandNonMehramContact" character varying, "obedienceToInLaws" character varying, CONSTRAINT "PK_3fb948d06430da344570b7f1779" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "male_islamic_lifestyle" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "salat" character varying, "ramadan" character varying, "fasting" character varying, "zakat" character varying, "food" character varying, "islamAndCulture" character varying, "celebratingBirthdays" character varying, "celebratingMawlid" character varying, "money" character varying, "islamicEducation" character varying, "appearance" character varying, "hajjAndUmra" character varying, "childrenAndUpbringing" character varying, CONSTRAINT "PK_a0fa5a1f475c7e4641f27569fe2" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "female_islamic_lifestyle" ("userId" uuid NOT NULL, "salat" character varying, "ramadan" character varying, "fasting" character varying, "zakat" character varying, "food" character varying, "islamAndCulture" character varying, "celebratingBirthdays" character varying, "celebratingMawlid" character varying, "money" character varying, "islamicEducation" character varying, "hijab" character varying, "appearance" character varying, "hajjAndUmra" character varying, "childrenAndUpbringing" character varying, CONSTRAINT "PK_b2d215fe90a0eeb316aea63f9b8" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "female_expected_islamic_lifestyle" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "salat" character varying, "hijab" character varying, "socialMedia" character varying, "wifeNonMehramContact" character varying, "husbandNonMehramContact" character varying, "wifeAppearance" character varying, "husbandAppearance" character varying, "childrenUpbringing" character varying, "polygyny" character varying, CONSTRAINT "PK_3132e5938ca9a790517ca37ba09" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "user_marriage_discussion" ("userId" uuid NOT NULL, "marriageType" character varying, "marriageLocation" character varying, "marriageVenue" character varying, "marriageTimeline" character varying, "familyInMarriageDiscussion" character varying, "dowry" character varying, "weddingBudget" character varying, CONSTRAINT "PK_43aef02804c5e1ebcd2e7964552" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "user_family_information" ("userId" uuid NOT NULL, "guardianFirstName" character varying, "guardianLastName" character varying, "relationshipToGuardian" character varying, "guardianPhoneNumber" character varying, "guardianEmail" character varying, "guardianIdCard" character varying, CONSTRAINT "PK_106fdb5a170cbba304a636fb1eb" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "ethnicOrigin"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "nationality"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "nationality" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "language" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "country" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "martialStatus"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "martialStatus" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "salat"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "salat" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "bornOrRevert"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "bornOrRevert" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "hijab"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "hijab" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "children"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "children" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "wantsChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "wantsChildren" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "education" text`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "profession"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "profession" text`);
        await queryRunner.query(`ALTER TABLE "male_expected_worldly_lifestyle" ADD CONSTRAINT "FK_80014bdb1536b5d45a3d56921d3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "female_expected_worldly_lifestyle" ADD CONSTRAINT "FK_96004613c3abe94a416e42a4597" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_worldly_lifestyle" ADD CONSTRAINT "FK_a7c6d18c251c7e285c158458bc1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "male_expected_islamic_lifestyle" ADD CONSTRAINT "FK_3fb948d06430da344570b7f1779" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "male_islamic_lifestyle" ADD CONSTRAINT "FK_a0fa5a1f475c7e4641f27569fe2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "female_islamic_lifestyle" ADD CONSTRAINT "FK_b2d215fe90a0eeb316aea63f9b8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "female_expected_islamic_lifestyle" ADD CONSTRAINT "FK_3132e5938ca9a790517ca37ba09" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_marriage_discussion" ADD CONSTRAINT "FK_43aef02804c5e1ebcd2e7964552" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_family_information" ADD CONSTRAINT "FK_106fdb5a170cbba304a636fb1eb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_family_information" DROP CONSTRAINT "FK_106fdb5a170cbba304a636fb1eb"`);
        await queryRunner.query(`ALTER TABLE "user_marriage_discussion" DROP CONSTRAINT "FK_43aef02804c5e1ebcd2e7964552"`);
        await queryRunner.query(`ALTER TABLE "female_expected_islamic_lifestyle" DROP CONSTRAINT "FK_3132e5938ca9a790517ca37ba09"`);
        await queryRunner.query(`ALTER TABLE "female_islamic_lifestyle" DROP CONSTRAINT "FK_b2d215fe90a0eeb316aea63f9b8"`);
        await queryRunner.query(`ALTER TABLE "male_islamic_lifestyle" DROP CONSTRAINT "FK_a0fa5a1f475c7e4641f27569fe2"`);
        await queryRunner.query(`ALTER TABLE "male_expected_islamic_lifestyle" DROP CONSTRAINT "FK_3fb948d06430da344570b7f1779"`);
        await queryRunner.query(`ALTER TABLE "user_worldly_lifestyle" DROP CONSTRAINT "FK_a7c6d18c251c7e285c158458bc1"`);
        await queryRunner.query(`ALTER TABLE "female_expected_worldly_lifestyle" DROP CONSTRAINT "FK_96004613c3abe94a416e42a4597"`);
        await queryRunner.query(`ALTER TABLE "male_expected_worldly_lifestyle" DROP CONSTRAINT "FK_80014bdb1536b5d45a3d56921d3"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "profession"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "profession" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "education" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "wantsChildren"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "wantsChildren" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "children"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "children" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "hijab"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "hijab" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "bornOrRevert"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "bornOrRevert" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "salat"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "salat" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "martialStatus"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "martialStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "language" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" DROP COLUMN "nationality"`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "nationality" character varying`);
        await queryRunner.query(`ALTER TABLE "preference" ADD "ethnicOrigin" character varying`);
        await queryRunner.query(`DROP TABLE "user_family_information"`);
        await queryRunner.query(`DROP TABLE "user_marriage_discussion"`);
        await queryRunner.query(`DROP TABLE "female_expected_islamic_lifestyle"`);
        await queryRunner.query(`DROP TABLE "female_islamic_lifestyle"`);
        await queryRunner.query(`DROP TABLE "male_islamic_lifestyle"`);
        await queryRunner.query(`DROP TABLE "male_expected_islamic_lifestyle"`);
        await queryRunner.query(`DROP TABLE "user_worldly_lifestyle"`);
        await queryRunner.query(`DROP TABLE "female_expected_worldly_lifestyle"`);
        await queryRunner.query(`DROP TABLE "male_expected_worldly_lifestyle"`);
    }

}
