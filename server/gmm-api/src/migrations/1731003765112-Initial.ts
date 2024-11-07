import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1731003765112 implements MigrationInterface {
    name = 'Initial1731003765112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."invitation_to_match_stage_status_enum" AS ENUM('Pending', 'Accepted', 'Rejected', 'Expired')`);
        await queryRunner.query(`CREATE TABLE "invitation_to_match_stage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "inviterId" uuid NOT NULL, "matchId" uuid NOT NULL, "status" "public"."invitation_to_match_stage_status_enum" NOT NULL DEFAULT 'Pending', "acceptedOrRejectedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_57633e1295e6b820759475b2dcd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."match_stage_enum" AS ENUM('Basic Information', 'Worldly Lifestyle', 'Islamic Lifestyle', 'Marriage Discussion', 'Family Introduction')`);
        await queryRunner.query(`CREATE TABLE "match" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "maleUserId" uuid NOT NULL, "femaleUserId" uuid NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "stage" "public"."match_stage_enum" NOT NULL DEFAULT 'Basic Information', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "preference" ("userId" uuid NOT NULL, "minAge" integer, "maxAge" integer, "minHeight" integer, "maxHeight" integer, "minWeight" integer, "maxWeight" integer, "ethnicOrigin" character varying, "nationality" character varying, "language" character varying, "country" character varying, "martialStatus" character varying, "salat" character varying, "bornOrRevert" character varying, "hijab" character varying, "children" character varying, "wantsChildren" character varying, "education" character varying, "profession" character varying, "drinking" boolean, "smoking" boolean, "tattoos" boolean, CONSTRAINT "PK_0990a6dd2425968d479f4bb91e6" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "role" ("name" character varying NOT NULL, "permissions" text, CONSTRAINT "PK_ae4578dcaed5adff96595e61660" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "planId" character varying NOT NULL, "currentPeriodStart" TIMESTAMP NOT NULL, "amount" integer, "remainingMatches" integer NOT NULL DEFAULT '0', "user_id" uuid, CONSTRAINT "REL_d0a95ef8a28188364c546eb65c" UNIQUE ("user_id"), CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "planId" character varying NOT NULL, "periodStart" TIMESTAMP NOT NULL, "amount" integer, "remainingMatches" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_91a0ee8b462f23bfb2ad7924754" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`CREATE TYPE "public"."user_accountstatus_enum" AS ENUM('Incomplete Registration', 'Pending', 'Approved', 'Denied', 'Suspended')`);
        await queryRunner.query(`CREATE TYPE "public"."user_verificationstatus_enum" AS ENUM('Verified', 'Unverified')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "phoneNumber" character varying, "password" character varying, "idCardImage" character varying, "pictures" text, "video" character varying, "city" character varying, "country" character varying, "dateOfBirth" date, "gender" "public"."user_gender_enum", "height" double precision, "weight" double precision, "skinColor" character varying, "languages" text, "nationality" character varying, "maritalStatus" character varying, "hasChildren" character varying, "numberOfChildren" integer, "ageOfOldestChild" integer, "ageOfYoungestChild" integer, "sunniMadhaib" character varying, "religiousPractice" character varying, "bornOrRevertToIslam" character varying, "drinks" boolean, "drugs" boolean, "smokes" boolean, "tattoos" boolean, "guardianId" uuid, "createdAt" TIMESTAMP, "stripeCustomerId" character varying, "roleId" character varying NOT NULL DEFAULT 'User', "accountStatus" "public"."user_accountstatus_enum" NOT NULL DEFAULT 'Incomplete Registration', "verificationStatus" "public"."user_verificationstatus_enum" NOT NULL DEFAULT 'Unverified', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."guardian_request_status_enum" AS ENUM('accepted', 'pending', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "guardian_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "guardianEmail" character varying NOT NULL, "status" "public"."guardian_request_status_enum" NOT NULL DEFAULT 'pending', "relationshipToGuardian" character varying NOT NULL, "requestedAt" TIMESTAMP NOT NULL DEFAULT now(), "acceptedAt" TIMESTAMP, "rejectedAt" TIMESTAMP, CONSTRAINT "PK_471a805ac3f3bec67f0eb5415f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match_pool" ("userId" uuid NOT NULL, CONSTRAINT "PK_20f6edb2b0480a444ab3316ed45" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("userId" character varying NOT NULL, "hashedToken" character varying NOT NULL, CONSTRAINT "PK_8e913e288156c133999341156ad" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_240853a0c3353c25fb12434ad33" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "otp" character varying NOT NULL, "expirationTime" TIMESTAMP NOT NULL, "verified" boolean DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invitation_to_match_stage" ADD CONSTRAINT "FK_208d2d2c885a07c662c05fdfe91" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7bcf290d69bfc76b2fe4d0dff9f" FOREIGN KEY ("maleUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_17233e123bcd7a101fc35482322" FOREIGN KEY ("femaleUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "preference" ADD CONSTRAINT "FK_0990a6dd2425968d479f4bb91e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription_history" ADD CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f" FOREIGN KEY ("guardianId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guardian_request" ADD CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_pool" ADD CONSTRAINT "FK_20f6edb2b0480a444ab3316ed45" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_pool" DROP CONSTRAINT "FK_20f6edb2b0480a444ab3316ed45"`);
        await queryRunner.query(`ALTER TABLE "guardian_request" DROP CONSTRAINT "FK_b2bdcbbd24352b722acfb51c7ac"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_594831c3a3e1f588afcb4f2ed4f"`);
        await queryRunner.query(`ALTER TABLE "subscription_history" DROP CONSTRAINT "FK_f54e1c2dcc806ddcaae98571c09"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`);
        await queryRunner.query(`ALTER TABLE "preference" DROP CONSTRAINT "FK_0990a6dd2425968d479f4bb91e6"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_17233e123bcd7a101fc35482322"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7bcf290d69bfc76b2fe4d0dff9f"`);
        await queryRunner.query(`ALTER TABLE "invitation_to_match_stage" DROP CONSTRAINT "FK_208d2d2c885a07c662c05fdfe91"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "match_pool"`);
        await queryRunner.query(`DROP TABLE "guardian_request"`);
        await queryRunner.query(`DROP TYPE "public"."guardian_request_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_verificationstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_accountstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "subscription_history"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "preference"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TYPE "public"."match_stage_enum"`);
        await queryRunner.query(`DROP TABLE "invitation_to_match_stage"`);
        await queryRunner.query(`DROP TYPE "public"."invitation_to_match_stage_status_enum"`);
    }

}
