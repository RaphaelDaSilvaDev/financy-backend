import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

@injectable()
export class UpdateUserAdminUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ id, name, email, password, isAdmin }: IRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("This user is not exists");
    }

    if (!name && !password && !password && isAdmin === undefined) {
      throw new AppError("You need set a field for update");
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      const verifyEmailIsExistent = await this.userRepository.findByEmail(email);
      if (verifyEmailIsExistent) {
        throw new AppError("Already exist an user with this email");
      }
      user.email = email;
    }

    if (password) {
      const hashPassword = await hash(password, 8);
      user.password = hashPassword;
    }

    if (isAdmin !== undefined) {
      user.isAdmin = isAdmin;
    }

    await this.userRepository.create(user);
  }
}
