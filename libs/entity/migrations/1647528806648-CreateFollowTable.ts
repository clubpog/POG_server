import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFollowTable1647528806648 implements MigrationInterface {
    name = 'CreateFollowTable1647528806648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_faa3781aab7f61f0e1ff81d2d8b"`);
        await queryRunner.query(`DROP INDEX "public"."idx_follow_2"`);
        await queryRunner.query(`ALTER TABLE "follow" RENAME COLUMN "record_summonerId" TO "summoner_id"`);
        await queryRunner.query(`CREATE INDEX "idx_follow_2" ON "follow" ("summoner_id") `);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_5f0dc9800d1cbc802454374c5bd" FOREIGN KEY ("summoner_id") REFERENCES "record"("summoner_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_5f0dc9800d1cbc802454374c5bd"`);
        await queryRunner.query(`DROP INDEX "public"."idx_follow_2"`);
        await queryRunner.query(`ALTER TABLE "follow" RENAME COLUMN "summoner_id" TO "record_summonerId"`);
        await queryRunner.query(`CREATE INDEX "idx_follow_2" ON "follow" ("record_summonerId") `);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_faa3781aab7f61f0e1ff81d2d8b" FOREIGN KEY ("record_summonerId") REFERENCES "record"("summoner_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
