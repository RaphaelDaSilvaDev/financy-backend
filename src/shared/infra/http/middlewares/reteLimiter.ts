import * as redis from "redis";
import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

const client = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    sessionTimeout: 5000,
  },
});

const Limiter = new RateLimiterRedis({
  storeClient: client,
  keyPrefix: "rateLimiter",
  points: 6,
  duration: 1,
});

const raterLimiter = new RateLimiterMemory(Limiter);

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await raterLimiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}
