import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlog1731841690297 implements MigrationInterface {
    name = 'AddBlog1731841690297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."blog_status_enum" AS ENUM('draft', 'published', 'archived')`);
        await queryRunner.query(`CREATE TABLE "blog" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "title" character varying NOT NULL, "excerpt" character varying, "status" "public"."blog_status_enum" NOT NULL DEFAULT 'draft', "tags" text, "authors" text, "content" text, "thumbnail" character varying, CONSTRAINT "PK_0dc7e58d73a1390874a663bd599" PRIMARY KEY ("slug"))`);
        await queryRunner.query(`CREATE TABLE "category" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_categories" ("blog_slug" character varying NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_8be80c9cf5ff6a6a4619dab3a33" PRIMARY KEY ("blog_slug", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a2d98bdf687fcbd30c3efe8db3" ON "blog_categories" ("blog_slug") `);
        await queryRunner.query(`CREATE INDEX "IDX_73cfc60ae668d6049fcb4ac1ee" ON "blog_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "blog_categories" ADD CONSTRAINT "FK_a2d98bdf687fcbd30c3efe8db36" FOREIGN KEY ("blog_slug") REFERENCES "blog"("slug") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_categories" ADD CONSTRAINT "FK_73cfc60ae668d6049fcb4ac1eec" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_categories" DROP CONSTRAINT "FK_73cfc60ae668d6049fcb4ac1eec"`);
        await queryRunner.query(`ALTER TABLE "blog_categories" DROP CONSTRAINT "FK_a2d98bdf687fcbd30c3efe8db36"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_73cfc60ae668d6049fcb4ac1ee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a2d98bdf687fcbd30c3efe8db3"`);
        await queryRunner.query(`DROP TABLE "blog_categories"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TYPE "public"."blog_status_enum"`);
    }

}
