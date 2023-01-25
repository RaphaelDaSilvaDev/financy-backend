import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AuthenticationUserUseCase } from "../authenticationUser/AuthenticationUserUseCase";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    private authenticationUserUseCase: AuthenticationUserUseCase
  ) {}

  async execute({ email, name, password }: ICreateUser) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError("This account already exists!");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    const response = await this.authenticationUserUseCase.execute({ email, password });

    return response;
  }
}
