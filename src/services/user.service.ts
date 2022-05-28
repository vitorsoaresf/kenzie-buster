import { Request } from "express";
import { User } from "../entities/user.entity";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories";
import { hashSync } from "bcrypt";
import { userCreateSchema } from "../schemas/user";

class UserService {
  create_user = async (body: IUser) => {
    const newUser = {...new User(),...body}
    
    newUser.password = hashSync(newUser.password, 10);
    newUser.email = newUser.email.toLowerCase()

    const user: User = (await userRepository.save(newUser)) as User;

    return await userCreateSchema.validate(user, {
        stripUnknown: true,
      });
  };
}

export default new UserService();
