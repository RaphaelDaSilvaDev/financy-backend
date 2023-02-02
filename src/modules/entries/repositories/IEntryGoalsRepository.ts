import { EntryGoals } from "../infra/entities/EntryGoals";
import { ICreateEntryGoals } from "../interfaces/ICreateEntryGoals";

export interface IEntryGoalsRepository {
  create(data: ICreateEntryGoals): Promise<EntryGoals>;
  listGoalEntries(entry_ids: string[], goal_id: string): Promise<EntryGoals[]>;
  getTotal(goal_id: string): Promise<number>;
}
