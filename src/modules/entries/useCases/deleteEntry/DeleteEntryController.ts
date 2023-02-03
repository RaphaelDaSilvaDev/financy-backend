import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteEntryUseCase } from "./DeleteEntryUseCase";

export class DeleteEntryController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteEntryUseCase = container.resolve(DeleteEntryUseCase);

    await deleteEntryUseCase.execute(id);

    return response.status(201).send();
  }
}
