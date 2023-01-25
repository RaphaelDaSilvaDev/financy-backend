import { User } from "@modules/users/infra/typeorm/entities/User";
import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { IUsersRepository } from "../IUsersRepository";

export class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, name, password, isAdmin }: ICreateUser): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      isAdmin,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id !== id);
    this.users.splice(index, 1);
  }

  async listAll(): Promise<User[]> {
    return this.users;
  }
}
