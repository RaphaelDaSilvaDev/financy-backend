import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserAdminUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, isAdmin }: ICreateUser) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError("This account already exists!");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      isAdmin: isAdmin ? true : false,
    });
  }
}
