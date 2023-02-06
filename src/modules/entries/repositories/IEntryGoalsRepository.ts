import { EntryGoals } from "../infra/entities/EntryGoals";
import { ICreateEntryGoals } from "../interfaces/ICreateEntryGoals";

export interface getGoalByDateProps {
  goal_id: string;
  date_interval: string[];
}

export interface IEntryGoalsRepository {
  create(data: ICreateEntryGoals): Promise<EntryGoals>;
  listGoalEntries(entry_ids: string[], goal_id: string): Promise<EntryGoals[]>;
  getTotal(goal_id: string): Promise<number>;
  deleteEntry(id: string): Promise<void>;
  getGoalByDate(data: getGoalByDateProps): Promise<EntryGoals[]>;
}
