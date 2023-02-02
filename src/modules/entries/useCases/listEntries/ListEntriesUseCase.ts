import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListEntriesUseCase {
  constructor(
    @inject("EntriesRepository")
    private entriesRepository: IEntriesRepository
  ) {}

  async execute(user_id: string) {
    const entries = await this.entriesRepository.listAllEntries(user_id);

    return entries;
  }
}
