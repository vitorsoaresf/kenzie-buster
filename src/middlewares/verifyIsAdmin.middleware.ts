import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";

const verifyIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdmin } = req.validated;

  if (isAdmin) {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if(!token){
      return 
    }
    let bodyToken: Object = {};
    verify(
      token,
      process.env.SECRET_KEY,
      (err: VerifyErrors, decoded: string | JwtPayload) => {
        if (err) {
          return "erro";
        }
        bodyToken = decoded;
      }
    );

    if (!bodyToken["isAdmin"]) {
      return res.status(400).json({ error: "No" });
    }
  }

  return next();
};

export default verifyIsAdmin;
