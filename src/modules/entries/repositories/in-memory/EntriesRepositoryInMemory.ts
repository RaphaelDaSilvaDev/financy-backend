import { Entry } from "@modules/entries/infra/entities/Entry";
import { ICreateEntry } from "@modules/entries/interfaces/ICreateEntry";
import { IEntriesRepository } from "../IEntriesRepository";

export class EntriesRepositoryInMemory implements IEntriesRepository {
  entries: Entry[] = [];

  async create({ income, outcome, user_id }: ICreateEntry): Promise<Entry> {
    const entry = new Entry();

    Object.assign(entry, {
      income,
      outcome,
      user_id,
    });

    this.entries.push(entry);

    return entry;
  }
}
