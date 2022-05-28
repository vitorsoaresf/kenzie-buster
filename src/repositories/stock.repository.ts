import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Stock } from "../entities/stock.entity";

interface IStockRepo {
  save: (stock: Partial<Stock>) => Promise<Stock>;
  all: () => Promise<Stock[]>;
  findOne: (payload: object) => Promise<Stock>;
}

class StockRepo implements IStockRepo {
  private ormRepo: Repository<Stock>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Stock);
  }

  save = async (stock: Partial<Stock>) => await this.ormRepo.save(stock);
  all = async () => await this.ormRepo.find();

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload }) || {} as Stock;
  };
}

export default new StockRepo();