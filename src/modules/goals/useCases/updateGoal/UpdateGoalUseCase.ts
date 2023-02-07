import { ICreateGoal } from "@modules/goals/interfaces/ICreateGoal";
import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateGoalUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalRepository: IGoalsRepository
  ) {}

  async execute({
    color,
    end_by,
    end_by_value,
    income_type,
    income_value,
    name,
    user_id,
    finished,
    id,
  }: ICreateGoal) {
    const goal = await this.goalRepository.findById(id, user_id);

    if (!goal) {
      throw new AppError("This goal not exists");
    }

    if (color) {
      goal.color = color;
    }

    if (end_by) {
      goal.end_by = end_by;
    }

    if (end_by_value) {
      goal.end_by_value = end_by_value;
    }

    if (finished) {
      goal.finished = finished;
    }

    if (income_type) {
      goal.income_type = income_type;
    }

    if (income_value) {
      goal.income_value = income_value;
    }

    if (name) {
      goal.name = name;
    }

    const createGoal = await this.goalRepository.create(goal);

    console.log(createGoal);

    return createGoal;
  }
}
