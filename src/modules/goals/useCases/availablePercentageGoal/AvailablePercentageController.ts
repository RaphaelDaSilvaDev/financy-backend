import { Request, Response } from "express";
import { container } from "tsyringe";
import { AvailablePercentageGoalUseCase } from "./AvaillablePercentageGoalUseCase";

export class AvailablePercentageGoalController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const availablePercentageGoalUseCase = container.resolve(AvailablePercentageGoalUseCase);

    const availablePercentage = await availablePercentageGoalUseCase.execute(id);

    return response.json(availablePercentage);
  }
}
