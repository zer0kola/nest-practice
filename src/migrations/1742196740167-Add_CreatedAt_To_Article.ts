import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToArticle1742196740167 implements MigrationInterface {
    name = 'AddCreatedAtToArticle1742196740167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "created_at"`);
    }

}
