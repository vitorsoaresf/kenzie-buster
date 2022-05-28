import express, { NextFunction } from "express";
import appRoutes  from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { Request, Response } from "express";
import { errorHandler } from "./errors";

const app = express();

app.use(express.json());

appRoutes(app);

app.use(errorMiddleware);

app.listen(3000);
