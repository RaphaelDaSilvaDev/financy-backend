import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserAdminUseCase } from "./DeleteUserAdminUseCase";

export class DeleteUserAdminController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteUserAdminUseCase = container.resolve(DeleteUserAdminUseCase);

    await deleteUserAdminUseCase.execute(id);

    return response.status(200).send();
  }
}
