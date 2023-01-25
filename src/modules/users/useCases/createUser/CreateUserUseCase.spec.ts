import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { AuthenticationUserUseCase } from "../authenticationUser/AuthenticationUserUseCase";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let authenticationUseCase: AuthenticationUserUseCase;

describe("Create user", () => {
  userRepositoryInMemory = new UserRepositoryInMemory();
  authenticationUseCase = new AuthenticationUserUseCase(userRepositoryInMemory);
  createUserUseCase = new CreateUserUseCase(userRepositoryInMemory, authenticationUseCase);

  it("should be able to create an user", async () => {
    const user: ICreateUser = {
      email: "test@authsystem.com",
      name: "auth system name",
      password: "auth system pass",
    };

    await createUserUseCase.execute(user);
  });

  it("should not be able to create an user with an existent email", async () => {
    expect(async () => {
      const user: ICreateUser = {
        email: "test@authsystem.com",
        name: "auth system name",
        password: "auth system pass",
      };

      await createUserUseCase.execute(user);
      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to authenticate an new user", async () => {
    const user: ICreateUser = {
      email: "test@auth.com",
      name: "auth system name",
      password: "auth",
    };

    await createUserUseCase.execute(user);

    const response = await authenticationUseCase.execute({
      email: "test@auth.com",
      password: "auth",
    });

    expect(response).toHaveProperty("token");
  });
});
