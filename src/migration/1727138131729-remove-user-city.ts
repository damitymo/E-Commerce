import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserCity1727138131729 implements MigrationInterface {
    name = 'RemoveUserCity1727138131729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "city" character varying(50) NOT NULL`);
    }

}
