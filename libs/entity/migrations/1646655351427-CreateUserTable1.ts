import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable11646655351427 implements MigrationInterface {
    name = 'CreateUserTable11646655351427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" character varying, "password" character varying, "device_id" character varying(50) NOT NULL, "is_push" boolean NOT NULL DEFAULT false, "firebase_token" character varying NOT NULL, "current_hashed_refresh_token" character varying, "logged_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_758b8ce7c18b9d347461b30228d" UNIQUE ("user_id"), CONSTRAINT "UQ_0232591a0b48e1eb92f3ec5d0d1" UNIQUE ("device_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "tier" character varying NOT NULL, "win" bigint NOT NULL, "lose" bigint NOT NULL, "profile_icon_id" character varying NOT NULL, "puuid" character varying NOT NULL, "lol_id" character varying NOT NULL, "league_point" integer NOT NULL, "rank" character varying NOT NULL, "user_id" bigint NOT NULL, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_favorite_1" ON "favorite" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74"`);
        await queryRunner.query(`DROP INDEX "public"."idx_favorite_1"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
