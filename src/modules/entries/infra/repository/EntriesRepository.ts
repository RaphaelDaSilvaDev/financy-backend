import { ICreateEntry } from "@modules/entries/interfaces/ICreateEntry";
import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { AppError } from "@shared/errors/AppError";
import { Between, getRepository, Repository } from "typeorm";
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

  async listAllEntries(id: string): Promise<Entry[]> {
    const allEntries = await this.repository.find({
      where: { user_id: id },
      order: { created_at: "DESC" },
    });

    return allEntries;
  }

  async deleteEntry(id: string): Promise<void> {
    const response = await this.repository.delete({ id });
    if (response.affected === 0) {
      throw new AppError("Could not delete!");
    }
  }

  async getByDate(user_id: string, date_interval: string[]): Promise<Entry[]> {
    return await this.repository.find({
      where: { user_id, created_at: Between(date_interval[0], date_interval[1]) },
    });
  }
}
