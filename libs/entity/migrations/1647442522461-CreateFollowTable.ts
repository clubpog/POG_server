import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFollowTable1647442522461 implements MigrationInterface {
    name = 'CreateFollowTable1647442522461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_e28cccb0d33870ac1f81f7a727d"`);
        await queryRunner.query(`DROP INDEX "public"."idx_record_1"`);
        await queryRunner.query(`CREATE TABLE "follow" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" bigint NOT NULL, "record_id" bigint NOT NULL, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_follow_2" ON "follow" ("record_id") `);
        await queryRunner.query(`CREATE INDEX "idx_follow_1" ON "follow" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "record" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_d3b514cd26ff6190a8f836f9b28" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_df2dced34bd86940f2970a14a89" FOREIGN KEY ("record_id") REFERENCES "record"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_df2dced34bd86940f2970a14a89"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_d3b514cd26ff6190a8f836f9b28"`);
        await queryRunner.query(`ALTER TABLE "record" ADD "user_id" bigint NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."idx_follow_1"`);
        await queryRunner.query(`DROP INDEX "public"."idx_follow_2"`);
        await queryRunner.query(`DROP TABLE "follow"`);
        await queryRunner.query(`CREATE INDEX "idx_record_1" ON "record" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_e28cccb0d33870ac1f81f7a727d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
