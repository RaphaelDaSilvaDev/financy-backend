import { IEntryGoalsRepository } from "@modules/entries/repositories/IEntryGoalsRepository";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListGoalsUseCase {
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

    return goalsWithBalance;
  }
}
