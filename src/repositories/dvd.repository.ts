import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { DVD } from "../entities/dvd.entity";

interface IDvdRepo {
  save: (dvd: Partial<DVD>) => Promise<DVD>;
  all: () => Promise<DVD[]>;
  findOne: (payload: object) => Promise<DVD>;
  updateDvd: (payload: object) => Promise<DVD>;
}

class DvdRepo implements IDvdRepo {
  private ormRepo: Repository<DVD>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(DVD);
  }

  save = async (dvd: Partial<DVD>) => await this.ormRepo.save(dvd);
  all = async () => await this.ormRepo.find();

  findOne = async (payload: object) => {
    return (await this.ormRepo.findOneBy({ ...payload })) || ({} as DVD);
  };

  updateDvd = async (payload: object) => {
    let update: DVD;
    await this.ormRepo
      .createQueryBuilder()
      .update(DVD)
      .set({ ...payload })
      .where("id = :id", { ...payload })
      .returning("*")
      .execute()
      .then((response) => {
        update = { ...response.raw[0] };
        return response.raw[0];
      });
    return update;
  };
}

export default new DvdRepo();
