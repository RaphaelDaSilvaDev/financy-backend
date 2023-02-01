import { EntriesRepository } from "@modules/entries/infra/repository/EntriesRepository";
import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { GoalsRepository } from "@modules/goals/infra/repository/GoalsRepository";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repository/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IGoalsRepository>("GoalsRepository", GoalsRepository);
container.registerSingleton<IEntriesRepository>("EntriesRepository", EntriesRepository);
