import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateChangedTier21653445543224 implements MigrationInterface {
    name = 'CreateChangedTier21653445543224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "changed_tier" DROP CONSTRAINT "FK_1c47830b8b74e88b037ab24b177"`);
        await queryRunner.query(`ALTER TABLE "changed_tier" ADD CONSTRAINT "FK_1c47830b8b74e88b037ab24b177" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "changed_tier" DROP CONSTRAINT "FK_1c47830b8b74e88b037ab24b177"`);
        await queryRunner.query(`ALTER TABLE "changed_tier" ADD CONSTRAINT "FK_1c47830b8b74e88b037ab24b177" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
