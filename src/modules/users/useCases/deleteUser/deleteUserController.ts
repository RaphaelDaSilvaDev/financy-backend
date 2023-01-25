import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./deleteUserUseCase";

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute(id);

    return response.status(200).send();
  }
}
