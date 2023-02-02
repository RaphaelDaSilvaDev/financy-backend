import { Request, Response } from "express";
import { container } from "tsyringe";
import { GeneralReportUseCase } from "./GeneralReportUseCase";

export class GeneralReportController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const generalReportUseCase = container.resolve(GeneralReportUseCase);

    const reports = await generalReportUseCase.execute(id);

    return response.json(reports);
  }
}
