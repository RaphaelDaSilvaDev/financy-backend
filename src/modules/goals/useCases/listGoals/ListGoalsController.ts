import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListGoalsUseCase } from "./ListGoalsUseCase";

export class ListGoalsController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const listGoalsUseCase = container.resolve(ListGoalsUseCase);

    const allGoals = await listGoalsUseCase.execute(id);

    return response.json(allGoals);
  }
}
