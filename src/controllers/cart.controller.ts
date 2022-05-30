import { Request, Response } from "express";
import { cartService } from "../services";

class CartController {
  CART_DVDS = async (req: Request, res: Response) => {
    const { dvd } = req;
    const { decoded } = req;
    const { quantity } = req.body;

    if (dvd.stock.quantity - quantity < 0) {
      return res.status(422).json({
        error: `current stock: ${dvd.stock.quantity}, received demand ${quantity}`,
      });
    }
    const cartRes = await cartService.create_cart(dvd, decoded, quantity);

    return res.json(cartRes).status(201);
  };
}

export default new CartController();
