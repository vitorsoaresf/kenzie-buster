import * as dotenv from "dotenv";
import { Request } from "express";
import { DVD } from "../entities/dvd.entity";
import { Stock } from "../entities/stock.entity";
import { IDvd } from "../interfaces/dvd.interface";
import dvdRepository from "../repositories/dvd.repository";
import stockRepository from "../repositories/stock.repository";
import { dvdsLsSchema } from "../schemas/dvd/dvdCreate.schema";

dotenv.config();

class DvdService {
  create_dvd = async (dvds: IDvd[]) => {
    let response = [];

    for (let i = 0; i < dvds.length; i++) {
      const findDvd = await dvdRepository.findOne({ name: dvds[i].name });

      if (!findDvd["id"]) {
        const newDvd = new DVD();
        newDvd.duration = dvds[i].duration;
        newDvd.name = dvds[i].name;

        const newStock = new Stock();
        newStock.price = dvds[i].price;
        newStock.quantity = dvds[i].quantity;

        newDvd.stock = await stockRepository.save(newStock);
        response.push(await dvdRepository.save(newDvd));
      } else {
        response.push({ error: "Dvd already exists!" });
      }
    }
    return response;
  };

  get_all_dvds = async () => {
    const dvds = await dvdRepository.all();
    return dvds;
  };

  cart_dvds = async (id: string) => {
    const dvds = await dvdRepository.findOne({ id });
  };
}

export default new DvdService();
