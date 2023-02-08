import { EntriesRepository } from "@modules/entries/infra/repository/EntriesRepository";
import { EntryGoalsRepository } from "@modules/entries/infra/repository/EntryGoalsRepository";
import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { GoalsRepository } from "@modules/goals/infra/repository/GoalsRepository";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { UsersRepository } from "@modules/users/infra/repository/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { container, delay } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  delay(() => UsersRepository)
);
container.registerSingleton<IGoalsRepository>(
  "GoalsRepository",
  delay(() => GoalsRepository)
);
container.registerSingleton<IEntriesRepository>(
  "EntriesRepository",
  delay(() => EntriesRepository)
);
container.registerSingleton<IEntryGoalsRepository>(
  "EntryGoalsRepository",
  delay(() => EntryGoalsRepository)
);
