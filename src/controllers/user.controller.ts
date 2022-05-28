import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  POST_user = async (req: Request, res: Response) => {
    const user = await userService.create_user(req.body);

    return res.json(user).status(201)

  };
}

export default new UserController();
