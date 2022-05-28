import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { User } from "../entities/user.entity";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({error:"Missing authorization token."});
  }
  
  return verify(
      token,
      process.env.SECRET_KEY,
      (err: VerifyErrors, decoded: string | JwtPayload) => {
          if (err) {
              return 'erro'
            }
        
            req.decoded = decoded as User;
        
            return next();
          }
  );
};

export default validateToken;
