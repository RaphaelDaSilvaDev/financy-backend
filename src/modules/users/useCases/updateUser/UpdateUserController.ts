import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const { name, password, born, gender } = request.body;
    const avatar_file = request.file?.filename;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({ id, name, password, avatar_file, born, gender });

    return response.status(201).json(user);
  }
}
