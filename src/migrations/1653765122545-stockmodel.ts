import { MigrationInterface, QueryRunner } from "typeorm";

export class stockmodel1653765122545 implements MigrationInterface {
    name = 'stockmodel1653765122545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
