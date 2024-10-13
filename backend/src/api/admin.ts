import express, { Express, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { STReservation } from "../../../types/reservation.types";
import {
  createReservationAdmin,
  deleteReservationAdmin,
  getReservationsAdmin,
} from "../features/reservations";
import { isAdmin } from "../middleware/isAdmin";
import { isApiError } from "../types/error";

export const addAdminRoutes = (app: Express) => {
  // ? Create admins
  app.post(
    "/create-admin",
    [isAdmin],
    express.json(),
    async (req: Request, res: Response) => {
      // Get the ID token passed.
      const idToken = req.body.idToken;

      // Verify the ID token and decode its payload.
      const claims = await getAuth().verifyIdToken(idToken);
      console.log(claims);

      // Verify user is eligible for additional privileges.
      if (
        typeof claims.email !== "undefined" &&
        typeof claims.email_verified !== "undefined" &&
        claims.email_verified &&
        claims.email === "ghiotto.davidenko@gmail.com"
      ) {
        // Add custom claims for additional privileges.
        await getAuth().setCustomUserClaims(claims.sub, {
          admin: true,
        });

        // Tell client to refresh token on user.
        res.end(
          JSON.stringify({
            status: "success",
          })
        );
      } else {
        // Return nothing.
        res.end(JSON.stringify({ status: "ineligible" }));
      }
    }
  );

  app.post(
    "/reservation/admin",
    [isAdmin],
    express.json(),
    async (req: Request, res: Response) => {
      const { body } = req;
      const reservation = await createReservationAdmin(body as STReservation);
      if (!reservation) {
        res.status(400).send({ message: "Error creating reservation" });
        return;
      }
      res.send({ reservation });
    }
  );

  app.delete(
    "/reservation/admin/:id",
    [isAdmin],
    express.json(),
    async (req: Request, res: Response) => {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ message: "Missing reservation ID" });
        return;
      }

      try {
        await deleteReservationAdmin(id);
        res.send({ message: "Reservation deleted" });
      } catch (e) {
        res.status(400).send({ message: "Error deleting reservation" });
        return;
      }
    }
  );

  app.get(
    "/reservations/admin",
    [isAdmin],
    express.json(),
    async (req: Request, res: Response) => {
      const userId = req.query.userId as string | undefined;
      const dates = req.query.dates as string[] | undefined;
      const datesArray = dates
        ? Array.isArray(dates)
          ? dates
          : [dates]
        : undefined;

      const reservations = await getReservationsAdmin({
        userId,
        dates: datesArray,
      });

      if (isApiError(reservations)) {
        res.status(reservations.status).send({ message: reservations.message });
        return;
      }

      res.send({ reservations });
    }
  );

  return app;
};
