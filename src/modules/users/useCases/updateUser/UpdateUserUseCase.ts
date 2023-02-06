import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  name?: string;
  password?: string;
  gender: string;
  born: Date;
  avatar_file: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ id, name, password, avatar_file, born, gender }: IRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("This user is not exists");
    }

    if (!name && !password && !avatar_file && !born && !gender) {
      throw new AppError("You need set a name or a password for update");
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      const passwordEncrypted = await hash(password, 8);

      user.password = passwordEncrypted;
    }

    if (born) {
      user.born = born;
    }

    if (gender) {
      user.gender = gender;
    }

    if (avatar_file) {
      if (user.avatar) {
        await deleteFile(`./tmp/avatar/${user.avatar}`);
      }
      user.avatar = avatar_file;
    }

    await this.userRepository.create(user);
  }
}
