import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationUserUseCase } from "./AuthenticationUserUseCase";

export class AuthenticationUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticationUserUseCase = container.resolve(AuthenticationUserUseCase);

    const userAuthentication = await authenticationUserUseCase.execute({ email, password });

    return response.json(userAuthentication);
  }
}
