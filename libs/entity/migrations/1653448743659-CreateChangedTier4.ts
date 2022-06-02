import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateChangedTier41653448743659 implements MigrationInterface {
    name = 'CreateChangedTier41653448743659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "changed_tier" DROP CONSTRAINT "FK_1c47830b8b74e88b037ab24b177"`);
        await queryRunner.query(`ALTER TABLE "changed_tier" ALTER COLUMN "summoner_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "changed_tier" ALTER COLUMN "summoner_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "changed_tier" ADD CONSTRAINT "FK_1c47830b8b74e88b037ab24b177" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
