import { ICreateEntryGoals } from "@modules/entries/interfaces/ICreateEntryGoals";
import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { getRepository, In, Repository } from "typeorm";
import { EntryGoals } from "../entities/EntryGoals";

export class EntryGoalsRepository implements IEntryGoalsRepository {
  private repository: Repository<EntryGoals>;

  constructor() {
    this.repository = getRepository(EntryGoals);
  }

  async create({ entry_id, goal_id, value }: ICreateEntryGoals): Promise<EntryGoals> {
    const entryGoal = this.repository.create({
      entry_id,
      goal_id,
      value,
    });

    await this.repository.save(entryGoal);

    return entryGoal;
  }

  async listGoalEntries(entry_ids: string[], goal_id: string): Promise<EntryGoals[]> {
    const entries = await this.repository.find({
      where: { entry_id: In(entry_ids), goal_id: goal_id },
    });
    return entries;
  }

  async getTotal(goal_id: string): Promise<number> {
    const goals = await this.repository.find({ goal_id });
    return goals.reduce((acc, value) => Number(acc) + Number(value.value), 0);
  }
}
