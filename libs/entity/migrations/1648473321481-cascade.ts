import {MigrationInterface, QueryRunner} from "typeorm";

export class cascade1648473321481 implements MigrationInterface {
    name = 'cascade1648473321481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_cc85ee2ad134fcc7c77eced37c7"`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23"`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_cc85ee2ad134fcc7c77eced37c7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23"`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" DROP CONSTRAINT "FK_cc85ee2ad134fcc7c77eced37c7"`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_01a5ec5c7c4f7121f4afe85ff23" FOREIGN KEY ("summoner_id") REFERENCES "summoner_record"("summoner_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_summoner" ADD CONSTRAINT "FK_cc85ee2ad134fcc7c77eced37c7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
