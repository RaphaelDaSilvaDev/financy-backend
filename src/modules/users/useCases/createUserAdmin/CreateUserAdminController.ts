import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserAdminUseCase } from "./CreateUserAdminUseCase";

export class CreateUserAdminController {
  async handle(request: Request, response: Response) {
    const { name, email, password, isAdmin } = request.body;

    const createUserAdminUseCase = container.resolve(CreateUserAdminUseCase);

    await createUserAdminUseCase.execute({ name, email, password, isAdmin });

    return response.status(201).send();
  }
}
