import { Router } from "express";
import { userController } from "../controllers";
// import { validateSchema, verifyUserExists } from "../middlewares";
// import { createUserSchema } from "../schemas/user/createUser.schema";
// import loginUserSchema from "../schemas/user/loginUser.schema";

const userRouter = Router();

// userRouter.post(
//   "/login",
//   validateSchema(loginUserSchema),
//   userController.loginUser
// );
userRouter.post(
  "/register",
  userController.POST_user
  //   validateSchema(createUserSchema),
  //   verifyUserExists,
);

export default userRouter;
