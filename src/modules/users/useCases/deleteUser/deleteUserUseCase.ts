import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository
  ) {}

  async execute(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    await this.repository.delete(id);
  }
}
