import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { User } from "../../entities/user.entity";

const validateTokenIsAdminDvd = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "missing authorization permision" });
  }

  return verify(
    token,
    process.env.SECRET_KEY,
    (err: VerifyErrors, decoded: string | JwtPayload) => {
      if (err) {
        return res.status(401).json({
          error: {
            name: "JsonWebTokenError",
            message: "jwt malformed",
          },
        });
      }
      // @ts-ignore
      if (decoded["isAdmin"]) {
        req.decoded = decoded as User;
        return next();
      }
      return res.status(401).json({
        error: "missing admin permission",
      });
    }
  );
};

export default validateTokenIsAdminDvd;
