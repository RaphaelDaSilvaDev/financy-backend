import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAdminUseCase } from "./UpdateUserAdminUseCase";

export class UpdateUserAdminController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { email, name, password, isAdmin } = request.body;

    const updateUserAdminUseCase = container.resolve(UpdateUserAdminUseCase);

    await updateUserAdminUseCase.execute({ id, email, isAdmin, name, password });

    return response.status(200).send();
  }
}
