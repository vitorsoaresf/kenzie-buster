import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";
import { User } from "../entities/user.entity";
import dvdRepository from "./dvd.repository";

interface ICartRepo {
  save: (cart: Partial<Cart>) => Promise<Cart>;
  all: () => Promise<Cart[]>;
  findOne: (payload: object) => Promise<Cart>;
  updateCart: (user: User) => Promise<any>;
}

class CartRepo implements ICartRepo {
  private ormRepo: Repository<Cart>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Cart);
  }

  save = async (cart: Partial<Cart>) => await this.ormRepo.save(cart);
  all = async () => await this.ormRepo.find();

  findOne = async (payload: object) => {
    return (await this.ormRepo.findOneBy({ ...payload })) || ({} as Cart);
  };

  updateCart = async (user: User) => {
    console.log("user ", user);
    const carts = await this.all();
    const findCarts = carts.filter((cart) => cart.user.id === user.id);
    const res = [];

    for (let i = 0; i < findCarts.length; i++) {
      if (findCarts[i]) {
        res.push({ message: "It has been paid" });
      } else {
        findCarts[i].paid = true;
        findCarts[i].dvd.id;

        const findDvd = await dvdRepository.findOne({
          id: findCarts[i].dvd.id,
        });

        let update: Cart;
        await this.ormRepo
          .createQueryBuilder()
          .update(Cart)
          .set({ ...findCarts[i] })
          .where("id = :id", { id: findCarts[i].id })
          .returning("*")
          .execute()
          .then((response) => {
            update = { ...response.raw[0] };
            return response.raw[0];
          });

        res.push({
          id: update.id,
          paid: update.paid,
          total: update.total,
          dvd: {
            id: findDvd.id,
            name: findDvd.name,
            duration: findDvd.duration,
          },
        });
      }
    }
    return res;
  };
}

export default new CartRepo();
