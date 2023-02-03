import { ICreateEntry } from "@modules/entries/interfaces/ICreateEntry";
import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateEntryUseCase {
  constructor(
    @inject("EntriesRepository")
    private entriesRepository: IEntriesRepository,
    @inject("GoalsRepository")
    private goalRepository: IGoalsRepository
  ) {}

  async execute({ user_id, income, outcome }: ICreateEntry) {
    const goalsAmount = await this.goalRepository.getAllGoalsByAmount(user_id);

    let balance = income - outcome;

    const totalAmountGoals = goalsAmount.reduce((acc, value) => {
      if (value.income_type === "amount") {
        return Number(acc) + Number(value.income_value);
      }
    }, 0);

    if (totalAmountGoals > balance) {
      throw new AppError("Insufficient funds!");
    }

    const entry = await this.entriesRepository.create({ user_id, income, outcome });

    if (!entry) {
      throw new AppError("Can not create this entry");
    }

    return entry;
  }
}
