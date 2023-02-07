import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetGoalUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository
  ) {}

  async execute(user_id: string, goal_id: string) {
    const goal = await this.goalsRepository.getGoal(user_id, goal_id);

    if (!goal) {
      throw new AppError("Can not find this goal");
    }

    return goal;
  }
}
