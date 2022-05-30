import { NextFunction, Request, Response } from "express";
import { DVD } from "../../entities/dvd.entity";
import dvdRepository from "../../repositories/dvd.repository";
import * as isUUID  from 'is-uuid'

const getByIdOr404Dvd = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  
  if(!isUUID.v4(id)){
    return res.status(404).json({ error: `Dvd Not Found` });
  }

  const foundDvd: DVD = await dvdRepository.findOne({id});

  if (!foundDvd["id"]) {
    return res.status(404).json({ error: `Dvd Not Found` });
  }
  
  req.dvd = foundDvd as DVD

  return next();
};

export default getByIdOr404Dvd;
