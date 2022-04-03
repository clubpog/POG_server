import {MigrationInterface, QueryRunner} from "typeorm";

export class SummonerRecordNullable1648031937397 implements MigrationInterface {
    name = 'SummonerRecordNullable1648031937397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner_record" ALTER COLUMN "tier" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ALTER COLUMN "profile_icon_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ALTER COLUMN "rank" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner_record" ALTER COLUMN "rank" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ALTER COLUMN "profile_icon_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ALTER COLUMN "tier" SET NOT NULL`);
    }

}
