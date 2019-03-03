import { MigrationInterface, QueryRunner } from 'typeorm';
// tslint:disable all
export class CategoryJoin1551636407868 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "todo_categories_category" ("todoId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_5131c830636d855568d3a70c352" PRIMARY KEY ("todoId", "categoryId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_4347fec6e6cc3be4ce39d9d9f3" ON "todo_categories_category" ("todoId") `);
    await queryRunner.query(`CREATE INDEX "IDX_80456ff2d7fd676c1ac2d107f3" ON "todo_categories_category" ("categoryId") `);
    await queryRunner.query(`ALTER TABLE "todo_categories_category" ADD CONSTRAINT "FK_4347fec6e6cc3be4ce39d9d9f36" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "todo_categories_category" ADD CONSTRAINT "FK_80456ff2d7fd676c1ac2d107f31" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "todo_categories_category" DROP CONSTRAINT "FK_80456ff2d7fd676c1ac2d107f31"`);
    await queryRunner.query(`ALTER TABLE "todo_categories_category" DROP CONSTRAINT "FK_4347fec6e6cc3be4ce39d9d9f36"`);
    await queryRunner.query(`DROP INDEX "IDX_80456ff2d7fd676c1ac2d107f3"`);
    await queryRunner.query(`DROP INDEX "IDX_4347fec6e6cc3be4ce39d9d9f3"`);
    await queryRunner.query(`DROP TABLE "todo_categories_category"`);
  }

}
