import { Request, Response } from "express";
import { cartRepository } from "../repositories";
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

    return res.status(200).json(cartRes);
  };

  CART_PAY = async (req: Request, res: Response) => {
    const resCart = await cartService.pay_cart(req.decoded);

    return res.status(200).json(resCart);
  };
}

export default new CartController();
