import { Request } from "express";
import { User } from "../entities/user.entity";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories";
import { hashSync } from "bcrypt";
import * as dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { userSerializedCreateSchema } from "../schemas/user/userCreate.schema";

dotenv.config();

interface ILogin {
  status: number;
  message: object;
}

class UserService {
  loginUser = async (req: Request): Promise<ILogin> => {
    const user: User = await userRepository.findOne({
      email: req.validated.email,
    });

    if (!user) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    if (!(await user.comparePwd(req.validated.password))) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }
    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { token },
    };
  };

  create_user = async (body: IUser) => {
    const newUser = {...new User(),...body}
    
    newUser.password = hashSync(newUser.password, 10);

    const user: User = await userRepository.save(newUser);

    return await userSerializedCreateSchema.validate(user, {
        stripUnknown: true,
      });
  };
}

export default new UserService();
