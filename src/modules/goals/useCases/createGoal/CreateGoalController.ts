import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateGoalUseCase } from "./CreateGoalUseCase";

export class CreateGoalController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const { name, income_type, income_value, end_by, end_by_value, color } = request.body;

    const createGoalUseCase = container.resolve(CreateGoalUseCase);

    const goal = await createGoalUseCase.execute({
      color,
      end_by,
      end_by_value,
      income_type,
      income_value,
      name,
      user_id: id,
    });

    return response.json(goal);
  }
}
