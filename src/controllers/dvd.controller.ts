import { Request, Response } from "express";
import { dvdService } from "../services";

class DvdController {
  POST_CREATE_DVD = async (req: Request, res: Response) => {
    const { dvds } = req.body;
    const dvdsRes = await dvdService.create_dvd(dvds);

    return res.json({ dvds: dvdsRes }).status(201);
  };

  GET_DVDS = async (req: Request, res: Response) => {
    const dvdsRes = await dvdService.get_all_dvds();

    return res.json({ dvds: dvdsRes }).status(200);
  };

  BUY_DVDS = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dvdsRes = await dvdService.cart_dvds(id);

    return res.json({ dvds: dvdsRes }).status(200);
  };
}

export default new DvdController();
