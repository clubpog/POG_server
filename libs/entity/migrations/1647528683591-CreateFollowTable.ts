import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFollowTable1647528683591 implements MigrationInterface {
    name = 'CreateFollowTable1647528683591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_df2dced34bd86940f2970a14a89"`);
        await queryRunner.query(`DROP INDEX "public"."idx_follow_2"`);
        await queryRunner.query(`ALTER TABLE "record" RENAME COLUMN "lol_id" TO "summoner_id"`);
        await queryRunner.query(`ALTER TABLE "follow" RENAME COLUMN "record_id" TO "record_summonerId"`);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "UQ_e9e60f27e428900108af848346d" UNIQUE ("summoner_id")`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "record_summonerId"`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "record_summonerId" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "idx_follow_2" ON "follow" ("record_summonerId") `);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_faa3781aab7f61f0e1ff81d2d8b" FOREIGN KEY ("record_summonerId") REFERENCES "record"("summoner_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_faa3781aab7f61f0e1ff81d2d8b"`);
        await queryRunner.query(`DROP INDEX "public"."idx_follow_2"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "record_summonerId"`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "record_summonerId" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "UQ_e9e60f27e428900108af848346d"`);
        await queryRunner.query(`ALTER TABLE "follow" RENAME COLUMN "record_summonerId" TO "record_id"`);
        await queryRunner.query(`ALTER TABLE "record" RENAME COLUMN "summoner_id" TO "lol_id"`);
        await queryRunner.query(`CREATE INDEX "idx_follow_2" ON "follow" ("record_id") `);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_df2dced34bd86940f2970a14a89" FOREIGN KEY ("record_id") REFERENCES "record"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
