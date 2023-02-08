import * as redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

const client = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    sessionTimeout: 20,
  },
});

const Limiter = new RateLimiterRedis({
  storeClient: client,
  keyPrefix: "rateLimiter",
  points: 10,
  duration: 5,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await client.connect();
    await Limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  } finally {
    await client.disconnect();
  }
}
