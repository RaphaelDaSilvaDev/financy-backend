import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetGoalUseCase } from "./GetGoalUseCase";

export class GetGoalController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { id: goal_id } = request.params;

    const getGoalUseCase = container.resolve(GetGoalUseCase);

    const goal = await getGoalUseCase.execute(user_id, goal_id);

    return response.json(goal);
  }
}
