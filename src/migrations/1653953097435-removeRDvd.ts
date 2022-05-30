import { MigrationInterface, QueryRunner } from "typeorm";

export class removeRDvd1653953097435 implements MigrationInterface {
    name = 'removeRDvd1653953097435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_ebb473cf371f4a2f8e94ebc029a"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "dvdId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "UQ_a76ead6fce8f9e9ef430ef5208d" UNIQUE ("dvdId")`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "UQ_a76ead6fce8f9e9ef430ef5208d"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "dvdId"`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_ebb473cf371f4a2f8e94ebc029a" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
