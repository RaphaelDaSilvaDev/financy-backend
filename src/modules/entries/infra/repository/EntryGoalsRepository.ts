import { ICreateEntryGoals } from "@modules/entries/interfaces/ICreateEntryGoals";
import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { getRepository, Repository } from "typeorm";
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
}
