import { MigrationInterface, QueryRunner } from "typeorm";

export class allModels1653737191498 implements MigrationInterface {
    name = 'allModels1653737191498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dvds" ("id" uuid NOT NULL, "name" character varying NOT NULL, "duration" character varying NOT NULL, "cartId" uuid, "stockId" uuid, CONSTRAINT "REL_d1e620c0f75aa0d8341f2c768a" UNIQUE ("stockId"), CONSTRAINT "PK_bcd090a9e4428d665c5ace6f433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL, "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, "userId" uuid, CONSTRAINT "REL_69828a178f152f157dcf2f70a8" UNIQUE ("userId"), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_ebb473cf371f4a2f8e94ebc029a" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_ebb473cf371f4a2f8e94ebc029a"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "dvds"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
