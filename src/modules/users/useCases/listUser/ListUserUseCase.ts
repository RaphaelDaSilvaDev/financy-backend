import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListUserUseCase {
  constructor(
    @inject("UsersRepository")
    private repository: IUsersRepository
  ) {}

  async execute() {
    const users = this.repository.listAll();

    return users;
  }
}
