import { Router } from "express";
import { cartController } from "../controllers";
import validateToken from "../middlewares/validateToken.middleware";

const cartRouter = Router();

cartRouter.get("", cartController.ALL_CARTS);
cartRouter.post("/pay", validateToken, cartController.CART_PAY);

export default cartRouter;
