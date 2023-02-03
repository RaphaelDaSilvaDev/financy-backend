import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteEntryGoalUseCase } from "./DeleteEntryGoalUseCase";

export class DeleteEntryGoalController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteEntryGoalUseCase = container.resolve(DeleteEntryGoalUseCase);

    await deleteEntryGoalUseCase.execute(id);

    return response.status(201).send();
  }
}
