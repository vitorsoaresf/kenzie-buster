import { Router } from "express";
import { dvdController, userController } from "../controllers";
import validadeUserSchema from "../middlewares/validateUserSchema.middleware";
import verifyUserExists from "../middlewares/verifyUserExists.middleware";
import { userCreateSchema } from "../schemas/user/userCreate.schema";
import userLoginSchema from "../schemas/user/userLogin.schema";
import validateTokenIsAdmin from "../middlewares/validateTokenIsAdmin.middleware";
import getByIdOr404 from "../middlewares/getByIdOr404.middleware";
import { dvdCreateSchema } from "../schemas/dvd/dvdCreate.schema";
import validateToken from "../middlewares/validateToken.middleware";
import validateTokenIsAdminDvd from "../middlewares/dvd/validateTokenIsAdmin.middleware";

const dvdRouter = Router();

dvdRouter.post(
  "/register",
  validateTokenIsAdminDvd,
  dvdController.POST_CREATE_DVD
);

dvdRouter.get("", dvdController.GET_DVDS);

export default dvdRouter;
