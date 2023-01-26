import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteGoalUseCase } from "./DeleteGoalUseCase";

export class DeleteGoalController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const deleteGoalUseCase = container.resolve(DeleteGoalUseCase);

    await deleteGoalUseCase.execute({ id, user_id });

    return response.status(201).send();
  }
}
