import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEntryUseCase } from "./CreateEntryUseCase";

export class CreateEntryController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { income, outcome } = request.body;

    const createEntryUseCase = container.resolve(CreateEntryUseCase);

    const entry = await createEntryUseCase.execute({ income, outcome, user_id });

    return response.json(entry);
  }
}
