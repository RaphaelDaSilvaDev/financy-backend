import { UsersRepository } from "@modules/users/infra/repository/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureIsAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;

  const userRepository = new UsersRepository();

  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!");
  }

  return next();
}
