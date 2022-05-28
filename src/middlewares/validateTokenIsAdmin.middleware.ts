import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { User } from "../entities/user.entity";

const validateTokenIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdmin } = req.validated;
  if (isAdmin) {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "missing authorization permision" });
    }

    return verify(
      token,
      process.env.SECRET_KEY,
      (err: VerifyErrors, decoded: string | JwtPayload) => {
        if (err) {
          return {
            error: {
              name: "JsonWebTokenError",
              message: "jwt malformed",
            },
          };
        }
        // @ts-ignore
        if (decoded["isAdmin"]) {
          req.decoded = decoded as User;
          return next();
        }
        return res.status(401).json({
          error: {
            name: "JsonWebTokenError",
            message: "jwt malformed",
          },
        });
      }
    );
  }

  return next();
};

export default validateTokenIsAdmin;
