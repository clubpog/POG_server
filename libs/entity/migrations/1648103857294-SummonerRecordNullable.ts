import {MigrationInterface, QueryRunner} from "typeorm";

export class SummonerRecordNullable1648103857294 implements MigrationInterface {
    name = 'SummonerRecordNullable1648103857294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner_record" DROP COLUMN "profile_icon_id"`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ADD "profile_icon_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner_record" DROP COLUMN "profile_icon_id"`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ADD "profile_icon_id" character varying`);
    }

}
