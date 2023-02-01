import { ICreateEntry } from "@modules/entries/interfaces/ICreateEntry";
import { EntriesRepositoryInMemory } from "@modules/entries/repositories/in-memory/EntriesRepositoryInMemory";
import { CreateEntryUseCase } from "./CreateEntryUseCase";

let createEntryUseCase: CreateEntryUseCase;
let entriesRepositoryInMemory: EntriesRepositoryInMemory;

describe("Create an Entry", () => {
  beforeEach(() => {
    entriesRepositoryInMemory = new EntriesRepositoryInMemory();
    createEntryUseCase = new CreateEntryUseCase(entriesRepositoryInMemory);
  });

  it("should be able to create a new entry", async () => {
    const entry: ICreateEntry = {
      income: 1000,
      outcome: 200,
      user_id: "user_id",
    };

    const createdEntry = await createEntryUseCase.execute(entry);

    expect(createdEntry).toHaveProperty("id");
  });
});
