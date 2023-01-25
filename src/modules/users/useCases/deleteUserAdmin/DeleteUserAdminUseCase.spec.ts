import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { AuthenticationUserUseCase } from "../authenticationUser/AuthenticationUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { DeleteUserAdminUseCase } from "./DeleteUserAdminUseCase";

let userRepository: UserRepositoryInMemory;
let deleteUserAdminUseCase: DeleteUserAdminUseCase;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticationUserUseCase;

describe("Delete user by admin", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    deleteUserAdminUseCase = new DeleteUserAdminUseCase(userRepository);
    authenticateUserUseCase = new AuthenticationUserUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository, authenticateUserUseCase);
  });

  it("should be able to delete an user by admin", async () => {
    await createUserUseCase.execute({
      name: "John",
      email: "john@email.com",
      password: "1234",
    });

    const user = await userRepository.findByEmail("john@email.com");

    expect(user).toHaveProperty("id");

    await deleteUserAdminUseCase.execute(user.id);

    const userList = await userRepository.listAll();

    expect(userList.length).toBe(0);
  });
});
