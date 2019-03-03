import { MigrationInterface, QueryRunner } from 'typeorm';

export class Index1551632369087 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`CREATE INDEX "IDX_4b5d5fc78610579a3f0784a6ac" ON "todo" ("name") `);
    }

  public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP INDEX "IDX_4b5d5fc78610579a3f0784a6ac"`);
    }

}
