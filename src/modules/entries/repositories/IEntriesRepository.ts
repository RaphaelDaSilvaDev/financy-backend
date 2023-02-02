import { Entry } from "../infra/entities/Entry";
import { ICreateEntry } from "../interfaces/ICreateEntry";

export interface IEntriesRepository {
  create(data: ICreateEntry): Promise<Entry>;
  findEntry(id: string): Promise<Entry>;
  listAllEntries(id: string): Promise<Entry[]>;
}
