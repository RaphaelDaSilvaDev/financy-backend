import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserAdminUseCase } from "./CreateUserAdminUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserAdminUseCase: CreateUserAdminUseCase;

describe("Create an user by admin", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserAdminUseCase = new CreateUserAdminUseCase(userRepositoryInMemory);
  });

  it("should be able to create an admin user", async () => {
    const user: ICreateUser = {
      email: "test@isAdmin.com",
      name: "Admin User",
      password: "123",
      isAdmin: true,
    };

    await createUserAdminUseCase.execute(user);

    const allUsers = await userRepositoryInMemory.listAll();

    expect(allUsers[0].isAdmin).toBe(true);
  });

  it("should be able to create an user", async () => {
    const user: ICreateUser = {
      email: "test@user.com",
      name: "User",
      password: "123",
    };

    await createUserAdminUseCase.execute(user);

    const allUsers = await userRepositoryInMemory.listAll();

    expect(allUsers[0].isAdmin).toBe(false);
  });
});
