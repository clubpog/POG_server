import {MigrationInterface, QueryRunner} from "typeorm";

export class SummonerRecordTypeChange1648104224613 implements MigrationInterface {
    name = 'SummonerRecordTypeChange1648104224613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner_record" DROP COLUMN "win"`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ADD "win" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner_record" DROP COLUMN "lose"`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ADD "lose" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner_record" DROP COLUMN "lose"`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ADD "lose" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner_record" DROP COLUMN "win"`);
        await queryRunner.query(`ALTER TABLE "summoner_record" ADD "win" bigint NOT NULL`);
    }

}
