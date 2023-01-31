import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class AvailablePercentageGoalUseCase {
  constructor(
    @inject("GoalsRepository")
    private repository: IGoalsRepository
  ) {}
  async execute(user_id: string) {
    const availablePercentage = this.repository.getAvailablePercentageByUser(user_id);

    if (!availablePercentage) {
      throw new AppError("Can not find any goal");
    }

    return availablePercentage;
  }
}
