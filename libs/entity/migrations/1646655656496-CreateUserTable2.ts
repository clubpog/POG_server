import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable21646655656496 implements MigrationInterface {
    name = 'CreateUserTable21646655656496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password_test" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "password_test"`);
    }

}
