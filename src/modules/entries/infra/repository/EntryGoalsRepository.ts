import { ICreateEntryGoals } from "@modules/entries/interfaces/ICreateEntryGoals";
import {
  getGoalByDateProps,
  IEntryGoalsRepository,
} from "@modules/entries/repositories/IEntryGoalsRepository";
import { AppError } from "@shared/errors/AppError";
import { Between, getRepository, In, Repository } from "typeorm";
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
      order: { created_at: "DESC" },
    });
    return entries;
  }

  async getTotal(goal_id: string): Promise<number> {
    const goals = await this.repository.find({ goal_id });
    return goals.reduce((acc, value) => Number(acc) + Number(value.value), 0);
  }

  async deleteEntry(id: string): Promise<void> {
    const response = await this.repository.delete({ id });
    if (response.affected === 0) {
      throw new AppError("Could not delete!");
    }
  }

  async getGoalByDate({ date_interval, goal_id }: getGoalByDateProps): Promise<EntryGoals[]> {
    return await this.repository.find({
      where: { created_at: Between(date_interval[0], date_interval[1]), goal_id },
    });
  }
}
