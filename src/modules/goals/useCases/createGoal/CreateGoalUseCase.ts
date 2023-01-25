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
