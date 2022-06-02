import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateChangedTier31653446832507 implements MigrationInterface {
    name = 'CreateChangedTier31653446832507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "changed_tier" DROP CONSTRAINT "FK_1c47830b8b74e88b037ab24b177"`);
        await queryRunner.query(`ALTER TABLE "changed_tier" ADD CONSTRAINT "FK_1c47830b8b74e88b037ab24b177" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "changed_tier" DROP CONSTRAINT "FK_1c47830b8b74e88b037ab24b177"`);
        await queryRunner.query(`ALTER TABLE "changed_tier" ADD CONSTRAINT "FK_1c47830b8b74e88b037ab24b177" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
