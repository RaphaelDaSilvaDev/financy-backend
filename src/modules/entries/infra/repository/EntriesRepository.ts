import { ICreateEntry } from "@modules/entries/interfaces/ICreateEntry";
import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { getRepository, Repository } from "typeorm";
import { Entry } from "../entities/Entry";

export class EntriesRepository implements IEntriesRepository {
  private repository: Repository<Entry>;

  constructor() {
    this.repository = getRepository(Entry);
  }

  async create({ income, outcome, user_id }: ICreateEntry): Promise<Entry> {
    const entry = this.repository.create({
      income,
      outcome,
      user_id,
    });

    await this.repository.save(entry);

    return entry;
  }

  async findEntry(id: string): Promise<Entry> {
    return await this.repository.findOne({ id });
  }
}