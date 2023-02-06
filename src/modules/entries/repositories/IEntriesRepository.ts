import { Entry } from "../infra/entities/Entry";
import { ICreateEntry } from "../interfaces/ICreateEntry";
export interface IEntriesRepository {
  create(data: ICreateEntry): Promise<Entry>;
  findEntry(id: string): Promise<Entry>;
  listAllEntries(id: string): Promise<Entry[]>;
  deleteEntry(id: string): Promise<void>;
  getByDate(user_id: string, date_interval: string[]): Promise<Entry[]>;
}
