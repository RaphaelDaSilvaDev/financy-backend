import { ICreateEntry } from "@modules/entries/interfaces/ICreateEntry";
import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateEntryUseCase {
  constructor(
    @inject("EntriesRepository")
    private repository: IEntriesRepository
  ) {}

  async execute({ user_id, income, outcome }: ICreateEntry) {
    const entry = await this.repository.create({ user_id, income, outcome });

    if (!entry) {
      throw new AppError("Can not create this entry");
    }

    return entry;
  }
}
