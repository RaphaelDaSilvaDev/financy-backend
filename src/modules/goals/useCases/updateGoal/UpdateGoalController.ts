import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateGoalUseCase } from "./UpdateGoalUseCase";

export class UpdateGoalController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { color, end_by, end_by_value, income_type, income_value, name, finished } = request.body;
    const { id } = request.params;

    const updateGoalUseCase = container.resolve(UpdateGoalUseCase);

    const goal = await updateGoalUseCase.execute({
      color,
      end_by,
      end_by_value,
      income_type,
      income_value,
      name,
      user_id,
      finished,
      id,
    });

    return response.json(goal);
  }
}
