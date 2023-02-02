import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GeneralReportUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository,
    @inject("EntryGoalsRepository")
    private entryGoalsRepository: IEntryGoalsRepository
  ) {}

  async execute(user_id: string) {
    const allGoals = await this.goalsRepository.getAllGoals(user_id);

    const goalsWithBalance = await Promise.all(
      allGoals.map(async (goal) => {
        const balance = await this.entryGoalsRepository.getTotal(goal.id);
        const goalWithBalance = Object.assign(goal, {
          balance,
        });
        return goalWithBalance;
      })
    );

    const totalBalance = goalsWithBalance.reduce(
      (acc, value) => Number(acc) + Number(value.balance),
      0
    );

    const goalsPercentage = goalsWithBalance.map((goal) => {
      const percentage = ((goal.balance / totalBalance) * 100).toFixed(1);
      const goalWithPercentage = Object.assign(goal, {
        percentage,
      });
      return goalWithPercentage;
    });

    return goalsPercentage;
  }
}
