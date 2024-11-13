import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserModelEmailProp1730640216750
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE "users" ADD "email" character varying`);
  }
}
