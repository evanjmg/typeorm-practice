import { MigrationInterface, QueryRunner } from 'typeorm';

export class Index1551632800857 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP INDEX "IDX_4b5d5fc78610579a3f0784a6ac"`);
      await queryRunner.query(`CREATE INDEX "IDX_a5c5e1185f575ea59cadcedce2" ON "todo" ("isComplete") `);
    }

  public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP INDEX "IDX_a5c5e1185f575ea59cadcedce2"`);
      await queryRunner.query(`CREATE INDEX "IDX_4b5d5fc78610579a3f0784a6ac" ON "todo" ("name") `);
    }

}
