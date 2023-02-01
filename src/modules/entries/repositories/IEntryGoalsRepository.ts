import { EntryGoals } from "../infra/entities/EntryGoals";
import { ICreateEntryGoals } from "../interfaces/ICreateEntryGoals";

export interface IEntryGoalsRepository {
  create(data: ICreateEntryGoals): Promise<EntryGoals>;
}
