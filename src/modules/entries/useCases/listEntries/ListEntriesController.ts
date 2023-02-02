import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEntriesUseCase } from "./ListEntriesUseCase";

export class ListEntriesController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const listEntriesUseCase = container.resolve(ListEntriesUseCase);

    const entries = await listEntriesUseCase.execute(id);

    return response.json(entries);
  }
}
