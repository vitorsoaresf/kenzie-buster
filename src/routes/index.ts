import { Express } from "express";
import dvdRouter from "./dvd.routes";
import userRouter from "./user.routes";

const appRoutes = (app: Express) => {
  app.use("/api/users", userRouter);
  app.use("/api/dvds",dvdRouter)
};

export default appRoutes;
