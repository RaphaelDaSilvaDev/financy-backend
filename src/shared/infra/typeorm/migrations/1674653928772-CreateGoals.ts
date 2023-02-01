import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGoals1674653928772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "goals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "income_type",
            type: "varchar",
          },
          {
            name: "income_value",
            type: "numeric",
          },
          {
            name: "end_by",
            type: "varchar",
          },
          {
            name: "end_by_value",
            type: "varchar",
          },
          {
            name: "finished",
            type: "boolean",
            default: false,
          },
          {
            name: "color",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserGoal",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("goals");
  }
}
