import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { resolve } from "path";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
    avatar_url: string;
    born: Date;
    gender: string;
  };
  token: string;
}

@injectable()
export class AuthenticationUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "8b0bca2a4b67bc3be9f7ea741ae6ceea", {
      subject: user.id,
      expiresIn: "1d",
    });

    const avatarLocation = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "..",
      "..",
      "..",
      "..",
      "..",
      "images/avatar"
    );

    const avatar =
      user.avatar === null
        ? null
        : process.env.disk === "local"
        ? "http://localhost:3333" + avatarLocation + "/" + user.avatar
        : process.env.AWS_BUCKET_URL + "/avatar/" + user.avatar;

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar_url: avatar,
        born: user.born,
        gender: user.gender,
      },
    };

    return tokenReturn;
  }
}
