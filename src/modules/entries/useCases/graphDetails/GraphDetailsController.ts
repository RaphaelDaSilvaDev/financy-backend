import { Request, Response } from "express";
import { container } from "tsyringe";
import { GraphDetailsUseCase } from "./GraphDetailsUseCase";

export class GraphDetailsController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { goal_id } = request.params;

    const graphDetailsUseCase = container.resolve(GraphDetailsUseCase);

    const data = await graphDetailsUseCase.execute({ goal_id, user_id });

    return response.json(data);
  }
}
