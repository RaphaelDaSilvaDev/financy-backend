import { ICreateGoal } from "@modules/goals/interfaces/ICreateGoal";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateGoalUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository
  ) {}

  async execute({
    user_id,
    name,
    income_value,
    income_type,
    end_by_value,
    end_by,
    color,
  }: ICreateGoal) {
    const goalAlreadyExists = await this.goalsRepository.findByName(name, user_id);

    if (goalAlreadyExists) {
      throw new AppError("This goal already exists!");
    }

    if (income_value <= 0) {
      throw new AppError("Enter a value to save!");
    }

    const percentageTotalValue = await this.goalsRepository.getAllPercentagesValues(user_id);

    if (income_type === "percentage" && income_value + percentageTotalValue > 100) {
      throw new AppError("Maximum percentage reached!");
    }

    const response = await this.goalsRepository.create({
      color,
      end_by,
      end_by_value,
      income_type,
      income_value,
      name,
      user_id,
    });

    return response;
  }
}
