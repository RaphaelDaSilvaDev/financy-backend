import { IEntriesRepository } from "@modules/entries/repositories/IEntriesRepository";
import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface CreateEntryGoalProps {
  entry_id: string;
}

@injectable()
export class CreateEntryGoalUseCase {
  constructor(
    @inject("EntriesRepository")
    private entriesRepository: IEntriesRepository,
    @inject("GoalsRepository")
    private goalRepository: IGoalsRepository,
    @inject("EntryGoalsRepository")
    private entryGoalsRepository: IEntryGoalsRepository
  ) {}

  async execute({ entry_id }: CreateEntryGoalProps) {
    const entry = await this.entriesRepository.findEntry(entry_id);

    if (!entry) {
      throw new AppError("Entry not found!");
    }

    let balance = entry.income - entry.outcome;

    const goalsAmount = await this.goalRepository.getAllGoalsByAmount(entry.user_id);
    const goalsPercentage = await this.goalRepository.getAllGoalsByPercentage(entry.user_id);

    const totalAmountGoals = goalsAmount.reduce((acc, value) => {
      if (value.income_type === "amount") {
        return Number(acc) + Number(value.income_value);
      }
    }, 0);

    if (totalAmountGoals > balance) {
      throw new AppError("Insufficient funds!");
    }

    const goalAmount = await Promise.all(
      goalsAmount.map(async (goal) => {
        balance -= goal.income_value;
        const entryGoal = await this.entryGoalsRepository.create({
          entry_id,
          goal_id: goal.id,
          value: goal.income_value,
        });
        entryGoal.goal = goal;
        return entryGoal;
      })
    );

    const goalPercentage = await Promise.all(
      goalsPercentage.map(async (goal) => {
        let saveBalance = balance;
        const value = (saveBalance = saveBalance * (goal.income_value / 100));
        const entryGoal = await this.entryGoalsRepository.create({
          entry_id,
          goal_id: goal.id,
          value,
        });

        entryGoal.goal = goal;
        return entryGoal;
      })
    );

    const totalPercentage = goalPercentage.reduce(
      (acc, value) => Number(acc) + Number(value.value),
      0
    );
    balance -= totalPercentage;

    const resultGoals = [...goalAmount, ...goalPercentage, { balance }];

    return resultGoals;
  }
}
