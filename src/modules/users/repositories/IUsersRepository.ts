import { User } from "../infra/entities/User";
import { ICreateUser } from "../interfaces/ICreateUser";

export interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  delete(id: string): Promise<void>;
  listAll(): Promise<User[]>;
}
