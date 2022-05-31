import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";
import { User } from "../entities/user.entity";

interface ICartRepo {
  save: (cart: Partial<Cart>) => Promise<Cart>;
  all: () => Promise<Cart[]>;
  findOne: (payload: object) => Promise<Cart>;
  updateCart: (user: User) => Promise<Cart>;
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
    const findCart = carts.find((cart) => cart.user.id === user.id);
    console.log("findCart  ", findCart);

    findCart.paid = true;

    let update;
    await this.ormRepo
      .createQueryBuilder()
      .update(Cart)
      .set({ ...findCart,['paid']: true })
      .where("id = :id", { id: findCart.id })
      .returning("*")
      .execute()
      .then((response) => {
        update = { ...response.raw[0] };
        return response.raw[0];
      });
    return update;
  };
}

export default new CartRepo();
