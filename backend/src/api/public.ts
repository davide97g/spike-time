import { Express, Request, Response } from "express";
import { version } from "../../package.json";
import { getReservationById } from "../features/reservations";

export const addPublicRoutes = (app: Express) => {
  app.get("/", (_: Request, res: Response) => {
    res.send({ message: "Spike Time Server", version });
  });

  app.get("/reservation/:id", async (req: Request, res: Response) => {
    const reservationId = req.params.id;
    const reservation = await getReservationById(reservationId);
    if (reservation === null) {
      res.status(404).send({ error: "Reservation not found" });
      return;
    }
    res.send({ reservation });
  });

  return app;
};
