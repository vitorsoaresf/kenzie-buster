import { Router } from "express";
import { cartController, dvdController } from "../controllers";
import validadeSchema from "../middlewares/validateSchema.middleware";
("../middlewares/validateSchema.middleware");
import verifyUserExists from "../middlewares/verifyUserExists.middleware";
import { userCreateSchema } from "../schemas/user/userCreate.schema";
import userLoginSchema from "../schemas/user/userLogin.schema";
import validateTokenIsAdmin from "../middlewares/validateTokenIsAdmin.middleware";
import getByIdOr404 from "../middlewares/getByIdOr404.middleware";
import { dvdsLsSchema } from "../schemas/dvd/dvdCreate.schema";
import validateToken from "../middlewares/validateToken.middleware";
import validateTokenIsAdminDvd from "../middlewares/dvd/validateTokenIsAdmin.middleware";
import getByIdOr404Dvd from "../middlewares/dvd/getByIdOr404Dvd.middleware";
import { cartSchema } from "../schemas/cart/cartCreate.schema";
import validadeCartSchema from "../middlewares/cart/validateCartSchema.middleware";

const dvdRouter = Router();

dvdRouter.post(
  "/register",
  validateTokenIsAdminDvd,
  dvdController.POST_CREATE_DVD
);

dvdRouter.get("", dvdController.GET_DVDS);

dvdRouter.post(
  "/buy/:id",
  validadeCartSchema(cartSchema),
  validateToken,
  getByIdOr404Dvd,
  cartController.CART_DVDS
);

export default dvdRouter;
