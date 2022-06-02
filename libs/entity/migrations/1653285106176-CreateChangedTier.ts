import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateChangedTier1653285106176 implements MigrationInterface {
    name = 'CreateChangedTier1653285106176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "changed_tier" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "match_id" character varying NOT NULL, "tier" character varying NOT NULL, "rank" character varying NOT NULL, "summoner_id" character varying, CONSTRAINT "PK_31d97da7f32901d48f4975e7fc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_changedTier_1" ON "changed_tier" ("summoner_id") `);
        await queryRunner.query(`ALTER TABLE "changed_tier" ADD CONSTRAINT "FK_1c47830b8b74e88b037ab24b177" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "changed_tier" DROP CONSTRAINT "FK_1c47830b8b74e88b037ab24b177"`);
        await queryRunner.query(`DROP INDEX "public"."idx_changedTier_1"`);
        await queryRunner.query(`DROP TABLE "changed_tier"`);
    }

}
