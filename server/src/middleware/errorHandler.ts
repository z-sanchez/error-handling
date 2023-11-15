import { Request, Response, NextFunction } from "express";
import { AppError } from "../AppError";
import { USER_NOT_FOUND } from "../constants/errorCodes";

//for error handler middleware, four arguments must be declared
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (error.errorCode === USER_NOT_FOUND) {
    return res.status(error.statusCode).send(error.getDetails());
  }
  return res.status(error.statusCode).send(error.getDetails());
};
