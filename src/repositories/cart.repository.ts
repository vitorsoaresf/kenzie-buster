import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";

interface ICartRepo {
  save: (cart: Partial<Cart>) => Promise<Cart>;
  all: () => Promise<Cart[]>;
  findOne: (payload: object) => Promise<Cart>;
}

class CartRepo implements ICartRepo {
  private ormRepo: Repository<Cart>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Cart);
  }

  save = async (cart: Partial<Cart>) => await this.ormRepo.save(cart);
  all = async () => await this.ormRepo.find();

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload }) || {} as Cart;
  };
}

export default new CartRepo();