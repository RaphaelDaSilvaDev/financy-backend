import { IGoalsRepository } from "@modules/goals/repositories/IGoalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DeleteGoalUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository
  ) {}

  async execute({ id, user_id }: IRequest) {
    try {
      await this.goalsRepository.removeGoal(id, user_id);
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
}
