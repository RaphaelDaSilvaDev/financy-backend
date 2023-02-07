import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/containers/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { IUserResponse } from "@modules/users/interfaces/IUserResponse";

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
    private userRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    id,
    name,
    password,
    avatar_file,
    born,
    gender,
  }: IRequest): Promise<IUserResponse> {
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
        await this.storageProvider.delete(user.avatar, "avatar");
      }

      await this.storageProvider.save(avatar_file, "avatar");
      user.avatar = avatar_file;
    }

    const userCreated = await this.userRepository.create(user);

    const userInfo: IUserResponse = instanceToInstance({
      email: userCreated.email,
      name: userCreated.name,
      id: userCreated.id,
      avatar: userCreated.avatar,
      born: userCreated.born,
      gender: userCreated.gender,
      avatar_url: userCreated.avatar_url,
    });

    return userInfo;
  }
}
