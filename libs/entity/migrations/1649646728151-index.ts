import {MigrationInterface, QueryRunner} from "typeorm";

export class index1649646728151 implements MigrationInterface {
    name = 'index1649646728151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_1"`);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_1" ON "favorite_summoner" ("user_id", "summoner_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_1"`);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_1" ON "favorite_summoner" ("user_id") `);
    }

}
