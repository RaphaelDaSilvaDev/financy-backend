import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddBornGenderAvatar1675708734553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "born",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "gender",
        type: "varchar",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("users", ["born", "gender"]);
  }
}
