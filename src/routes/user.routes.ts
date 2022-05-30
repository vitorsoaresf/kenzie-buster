import { Router } from "express";
import { userController } from "../controllers";
import verifyIsAdmin from "../middlewares/verifyIsAdmin.middleware";
import validadeSchema from "../middlewares/validateSchema.middleware";
// import isAdmin from "../middlewares/isAdmin.middleware";
import validateToken from "../middlewares/validateToken.middleware";
import verifyUserExists from "../middlewares/verifyUserExists.middleware";
import { userCreateSchema } from "../schemas/user/userCreate.schema";
import userLoginSchema from "../schemas/user/userLogin.schema";
import validateTokenIsAdmin from "../middlewares/validateTokenIsAdmin.middleware";
import getByIdOr404 from "../middlewares/getByIdOr404.middleware";
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
  "/login",
  validadeSchema(userLoginSchema),
  getByIdOr404,
  userController.LOGIN_USER
);
userRouter.post(
  "/register",
  validadeSchema(userCreateSchema),
  verifyUserExists,
  validateTokenIsAdmin,
  userController.POST_CREATE_USER
  // isAdmin,
  //   validateSchema(createUserSchema),
  //   verifyUserExists,
);

export default userRouter;
