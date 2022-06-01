import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { userRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser: User = await userRepository.findOne({
    email: (req.validated as User).email,
  });

  
  if (foundUser['email']) {
    return res.status(409).json({"error": `Key (email)=(${foundUser.email}) already exists.`});;
  }
  
  return next();
};

export default verifyUserExists;
