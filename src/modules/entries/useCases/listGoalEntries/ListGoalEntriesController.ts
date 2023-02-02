import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListGoalEntriesUseCase } from "./ListGoalEntriesUseCase";

export class ListGoalEntriesController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { id: goal_id } = request.params;

    const listGoalEntriesUseCase = container.resolve(ListGoalEntriesUseCase);

    const entries = await listGoalEntriesUseCase.execute({ goal_id: goal_id as string, user_id });

    return response.json(entries);
  }
}
