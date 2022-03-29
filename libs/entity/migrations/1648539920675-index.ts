import {MigrationInterface, QueryRunner} from "typeorm";

export class index1648539920675 implements MigrationInterface {
    name = 'index1648539920675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_2"`);
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_1"`);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_2" ON "favorite_summoner" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_1" ON "favorite_summoner" ("summoner_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_1"`);
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_2"`);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_1" ON "favorite_summoner" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_2" ON "favorite_summoner" ("summoner_id") `);
    }

}
