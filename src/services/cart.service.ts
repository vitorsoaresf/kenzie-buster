import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { Cart } from "../entities/cart.entity";
import { DVD } from "../entities/dvd.entity";
import { User } from "../entities/user.entity";
import { stockRepository } from "../repositories";
import cartRepository from "../repositories/cart.repository";

dotenv.config();

class CartService {
  create_cart = async (dvd: DVD, user: User, quantity: number) => {
    const cart = new Cart();

    cart.total = quantity * dvd.stock.price;
    cart.user = user;

    dvd.stock.quantity -= quantity;
    await stockRepository.updateStock(dvd.stock);

    cart.dvd = dvd;
    const resCart = await cartRepository.save(cart);

    return resCart;
  };
}

export default new CartService();
