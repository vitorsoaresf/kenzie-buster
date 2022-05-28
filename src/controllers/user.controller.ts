import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  LOGIN_USER = async (req: Request, res: Response) => {
    const { status, message } = await userService.loginUser(req);
    return res.status(status).json(message);
  };

  POST_CREATE_USER = async (req: Request, res: Response) => {
    const user = await userService.create_user(req.body);

    return res.json(user).status(201)

  };
}

export default new UserController();
