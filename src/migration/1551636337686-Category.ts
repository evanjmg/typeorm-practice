import { MigrationInterface, QueryRunner } from 'typeorm';

export class Category1551636337686 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
    }

  public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP TABLE "category"`);
    }

}
