import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEntryGoals1675268486007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "entry_goals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "value",
            type: "numeric",
          },
          {
            name: "entry_id",
            type: "uuid",
          },
          {
            name: "goal_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKEntryIncome",
            referencedTableName: "entries",
            referencedColumnNames: ["id"],
            columnNames: ["entry_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKEntryGoal",
            referencedTableName: "goals",
            referencedColumnNames: ["id"],
            columnNames: ["goal_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("entry_goals");
  }
}
