import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEntryGoalUseCase } from "./CreateEntryGoalUseCase";
import { CreateEntryUseCase } from "./CreateEntryUseCase";

export class CreateEntryController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { income, outcome } = request.body;

    const createEntryUseCase = container.resolve(CreateEntryUseCase);
    const entry = await createEntryUseCase.execute({ income, outcome, user_id });

    const createEntryGoalUseCase = container.resolve(CreateEntryGoalUseCase);
    const entryGoals = await createEntryGoalUseCase.execute({ entry_id: entry.id });

    return response.json({ entry, entryGoals });
  }
}
