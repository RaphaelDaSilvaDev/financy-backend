import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListGoalsUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository
  ) {}

  async execute(user_id: string) {
    const allGoals = await this.goalsRepository.getAllGoals(user_id);

    return allGoals;
  }
}
