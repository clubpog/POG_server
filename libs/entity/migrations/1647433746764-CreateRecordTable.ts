import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRecordTable1647433746764 implements MigrationInterface {
    name = 'CreateRecordTable1647433746764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "record" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "tier" character varying NOT NULL, "win" bigint NOT NULL, "lose" bigint NOT NULL, "profile_icon_id" character varying NOT NULL, "puuid" character varying NOT NULL, "lol_id" character varying NOT NULL, "league_point" integer NOT NULL, "rank" character varying NOT NULL, "user_id" bigint NOT NULL, CONSTRAINT "PK_5cb1f4d1aff275cf9001f4343b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_record_1" ON "record" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_e28cccb0d33870ac1f81f7a727d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_e28cccb0d33870ac1f81f7a727d"`);
        await queryRunner.query(`DROP INDEX "public"."idx_record_1"`);
        await queryRunner.query(`DROP TABLE "record"`);
    }

}
