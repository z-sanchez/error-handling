import { NextFunction, Request, Response } from "express";

//try catch abstraction so you dont have to write out try/catch block
export const tryCatch =
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    controller: any
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
