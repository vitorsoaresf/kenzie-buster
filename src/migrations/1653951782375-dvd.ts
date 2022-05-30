import { MigrationInterface, QueryRunner } from "typeorm";

export class dvd1653951782375 implements MigrationInterface {
    name = 'dvd1653951782375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" ADD "dvdsId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "UQ_b678ae8e03fb225d08c7477fd07" UNIQUE ("dvdsId")`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_b678ae8e03fb225d08c7477fd07" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_b678ae8e03fb225d08c7477fd07"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "UQ_b678ae8e03fb225d08c7477fd07"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "dvdsId"`);
    }

}
