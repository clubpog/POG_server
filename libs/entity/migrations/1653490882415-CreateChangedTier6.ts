import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateChangedTier61653490882415 implements MigrationInterface {
    name = 'CreateChangedTier61653490882415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "changed_tier" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "changed_tier" DROP COLUMN "status"`);
    }

}
