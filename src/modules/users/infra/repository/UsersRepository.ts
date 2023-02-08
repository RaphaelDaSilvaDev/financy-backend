import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    email,
    name,
    password,
    isAdmin,
    avatar,
    born,
    gender,
  }: ICreateUser): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      isAdmin,
      avatar,
      born,
      gender,
    });

    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async listAll(): Promise<User[]> {
    const users = await this.repository.find({ order: { created_at: "ASC" } });
    return users;
  }
}
