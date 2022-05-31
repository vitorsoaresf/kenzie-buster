import { Express } from "express";
import cartRouter from "./cart.routes";
import dvdRouter from "./dvd.routes";
import userRouter from "./user.routes";

const appRoutes = (app: Express) => {
  app.use("/api/users", userRouter);
  app.use("/api/dvds",dvdRouter)
  app.use("/api/cart",cartRouter)

};

export default appRoutes;
