import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticationUserUseCase } from "./AuthenticationUserUseCase";

let userRepository: UserRepositoryInMemory;
let authenticationUserUseCase: AuthenticationUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate an user", () => {
  userRepository = new UserRepositoryInMemory();
  authenticationUserUseCase = new AuthenticationUserUseCase(userRepository);
  createUserUseCase = new CreateUserUseCase(userRepository, authenticationUserUseCase);

  it("should be able to authenticate an user", async () => {
    const user: ICreateUser = {
      name: "john@doe.com",
      password: "12345",
      email: "john@doe.com",
    };

    await createUserUseCase.execute(user);

    const result = await authenticationUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate with an non existis account", () => {
    expect(async () => {
      await authenticationUserUseCase.execute({
        email: "john@doe.com",
        password: "132456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with an incorrect password", () => {
    expect(async () => {
      const user: ICreateUser = {
        name: "john@doe.com",
        password: "12345",
        email: "john@doe.com",
      };

      await createUserUseCase.execute(user);

      await authenticationUserUseCase.execute({ email: user.email, password: "incorrectPassword" });
    }).rejects.toBeInstanceOf(AppError);
  });
});
