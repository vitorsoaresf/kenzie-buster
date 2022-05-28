import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { ErrorHandler } from "../errors";
import { userRepository } from "../repositories";

const getByIdOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser: User = await userRepository.findOne({
    email: req.body.email,
  });
  
  if (!foundUser['email']) {
    return res.status(404).json({ error: `User Not Found` });
  }

  return next();
};

export default getByIdOr404;
