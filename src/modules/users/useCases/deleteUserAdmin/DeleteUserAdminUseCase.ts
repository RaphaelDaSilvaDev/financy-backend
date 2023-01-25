import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteUserAdminUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("This user is not exists");
    }

    await this.userRepository.delete(id);
  }
}
