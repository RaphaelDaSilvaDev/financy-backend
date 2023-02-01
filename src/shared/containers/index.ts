import { EntriesRepository } from "@modules/entries/infra/repository/EntriesRepository";
import { EntryGoalsRepository } from "@modules/entries/infra/repository/EntryGoalsRepository";
import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { GoalsRepository } from "@modules/goals/infra/repository/GoalsRepository";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repository/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IGoalsRepository>("GoalsRepository", GoalsRepository);
container.registerSingleton<IEntriesRepository>("EntriesRepository", EntriesRepository);
container.registerSingleton<IEntryGoalsRepository>("EntryGoalsRepository", EntryGoalsRepository);
