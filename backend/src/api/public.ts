import { Express, Request, Response } from "express";
import { version } from "../../package.json";

export const addPublicRoutes = (app: Express) => {
  app.get("/", (_: Request, res: Response) => {
    res.send({ message: "Spike Time Server", version });
  });

  return app;
};
