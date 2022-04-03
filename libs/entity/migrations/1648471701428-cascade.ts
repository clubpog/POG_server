import {MigrationInterface, QueryRunner} from "typeorm";

export class cascade1648471701428 implements MigrationInterface {
    name = 'cascade1648471701428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "summoner_record" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "tier" character varying, "win" integer NOT NULL, "lose" integer NOT NULL, "profile_icon_id" integer NOT NULL, "puuid" character varying NOT NULL, "summoner_id" character varying NOT NULL, "league_point" integer NOT NULL, "rank" character varying, CONSTRAINT "UQ_716eaabdfeca68d19b612ff783b" UNIQUE ("summoner_id"), CONSTRAINT "PK_cb1476b13c099b057573ec4a7ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_summonerRecord_1" ON "summoner_record" ("summoner_id") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" character varying, "password" character varying, "device_id" character varying(50) NOT NULL, "is_push" boolean NOT NULL DEFAULT false, "firebase_token" character varying NOT NULL, "current_hashed_refresh_token" character varying, "logged_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_758b8ce7c18b9d347461b30228d" UNIQUE ("user_id"), CONSTRAINT "UQ_0232591a0b48e1eb92f3ec5d0d1" UNIQUE ("device_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_summoner" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" bigint NOT NULL, "summoner_id" character varying, CONSTRAINT "PK_757ccf78852f33ca1149fff4ca7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_2" ON "favorite_summoner" ("summoner_id") `);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_1" ON "favorite_summoner" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_cc85ee2ad134fcc7c77eced37c7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23"`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_cc85ee2ad134fcc7c77eced37c7"`);
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_1"`);
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_2"`);
        await queryRunner.query(`DROP TABLE "favorite_summoner"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."idx_summonerRecord_1"`);
        await queryRunner.query(`DROP TABLE "summoner_record"`);
    }

}
