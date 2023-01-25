import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  name?: string;
  password?: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ id, name, password }: IRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("This user is not exists");
    }

    if (!name && !password) {
      throw new AppError("You need set a name or a password for update");
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      const passwordEncrypted = await hash(password, 8);

      user.password = passwordEncrypted;
    }

    await this.userRepository.create(user);
  }
}
