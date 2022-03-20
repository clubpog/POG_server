import {MigrationInterface, QueryRunner} from "typeorm";

export class IndexFix1647760309148 implements MigrationInterface {
    name = 'IndexFix1647760309148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_follow_2"`);
        await queryRunner.query(`DROP INDEX "public"."idx_follow_1"`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23"`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ALTER COLUMN "summoner_id" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "idx_summonerRecord_1" ON "summoner_record" ("summoner_id") `);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_2" ON "favorite_summoner" ("summoner_id") `);
        await queryRunner.query(`CREATE INDEX "idx_favoriteSummoner_1" ON "favorite_summoner" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23"`);
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_1"`);
        await queryRunner.query(`DROP INDEX "public"."idx_favoriteSummoner_2"`);
        await queryRunner.query(`DROP INDEX "public"."idx_summonerRecord_1"`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ALTER COLUMN "summoner_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE INDEX "idx_follow_1" ON "favorite_summoner" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "idx_follow_2" ON "favorite_summoner" ("summoner_id") `);
    }

}
