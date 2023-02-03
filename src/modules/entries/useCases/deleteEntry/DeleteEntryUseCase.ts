import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteEntryUseCase {
  constructor(
    @inject("EntriesRepository")
    private entryRepository: IEntriesRepository
  ) {}

  async execute(entry_id: string) {
    await this.entryRepository.deleteEntry(entry_id);
  }
}
