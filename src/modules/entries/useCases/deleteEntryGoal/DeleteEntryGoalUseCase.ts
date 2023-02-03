import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteEntryGoalUseCase {
  constructor(
    @inject("EntryGoalsRepository")
    private entryRepository: IEntryGoalsRepository
  ) {}

  async execute(entry_id: string) {
    await this.entryRepository.deleteEntry(entry_id);
  }
}
