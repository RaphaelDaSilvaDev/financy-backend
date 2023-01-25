import { ICreateUser } from "@modules/users/interfaces/ICreateUser";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AuthenticationUserUseCase } from "../authenticationUser/AuthenticationUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserAdminUseCase } from "./UpdateUserAdminUseCase";

let userRepository: IUsersRepository;
let updateUserAdminUseCase: UpdateUserAdminUseCase;
let createUser: CreateUserUseCase;
let authenticateUserUseCase: AuthenticationUserUseCase;

describe("Update a user by id", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    updateUserAdminUseCase = new UpdateUserAdminUseCase(userRepository);
    authenticateUserUseCase = new AuthenticationUserUseCase(userRepository);
    createUser = new CreateUserUseCase(userRepository, authenticateUserUseCase);
  });

  it("should be able update an user by id", async () => {
    await createUser.execute({
      name: "John",
      email: "John@due.com",
      password: "1234",
    });

    const user = await userRepository.findByEmail("John@due.com");

    await updateUserAdminUseCase.execute({ id: user.id, name: "Lucca" });

    const updatedUser = await userRepository.findByEmail("John@due.com");
    expect(updatedUser.name).toBe("Lucca");
  });
});
