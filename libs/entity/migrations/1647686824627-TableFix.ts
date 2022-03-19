import {MigrationInterface, QueryRunner} from "typeorm";

export class TableFix1647686824627 implements MigrationInterface {
    name = 'TableFix1647686824627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "summoner_record" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "tier" character varying NOT NULL, "win" bigint NOT NULL, "lose" bigint NOT NULL, "profile_icon_id" character varying NOT NULL, "puuid" character varying NOT NULL, "summoner_id" character varying NOT NULL, "league_point" integer NOT NULL, "rank" character varying NOT NULL, CONSTRAINT "UQ_716eaabdfeca68d19b612ff783b" UNIQUE ("summoner_id"), CONSTRAINT "PK_cb1476b13c099b057573ec4a7ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_summoner" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" bigint NOT NULL, "summoner_id" character varying NOT NULL, CONSTRAINT "PK_757ccf78852f33ca1149fff4ca7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_follow_2" ON "favorite_summoner" ("summoner_id") `);
        await queryRunner.query(`CREATE INDEX "idx_follow_1" ON "favorite_summoner" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_cc85ee2ad134fcc7c77eced37c7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23"`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_cc85ee2ad134fcc7c77eced37c7"`);
        await queryRunner.query(`DROP INDEX "public"."idx_follow_1"`);
        await queryRunner.query(`DROP INDEX "public"."idx_follow_2"`);
        await queryRunner.query(`DROP TABLE "favorite_summoner"`);
        await queryRunner.query(`DROP TABLE "summoner_record"`);
    }

}
