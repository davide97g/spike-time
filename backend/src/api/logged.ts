import express, { Express, Request, Response } from "express";
import { stripe } from "../config/stripe";
import { addCreditsToUser } from "../features/payments";
import {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
} from "../features/reservations";
import { isLogged } from "../middleware/isLogged";
import { STReservation } from "../../../types/reservation.types";

const endpointSecret = process.env.STRIPE_CHECKOUT_SIGNING_SECRET;

export const addLoggedRoutes = (app: Express) => {
  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (request, response) => {
      console.info("[Event]: webhook");
      const sig = request.headers["stripe-signature"] as string;

      if (!endpointSecret) {
        response.status(400).send(`Webhook Error: Signing secret not found`);
        return;
      }

      let event;

      try {
        event = stripe?.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret
        );
      } catch (err: any) {
        response.status(400).send(`Webhook Error: ${err?.message}`);
        return;
      }

      // Handle the event
      switch (event?.type) {
        case "checkout.session.completed":
          console.info("[Event]: checkout.session.completed");
          await addCreditsToUser(event.data.object);
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event?.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  );

  app.get("/reservation/:id", async (req: Request, res: Response) => {
    const reservationId = req.params.id;
    const reservation = await getReservationById(reservationId);
    if (reservation === null) {
      res.status(404).send({ error: "Reservation not found" });
      return;
    }
    res.send({ reservation });
  });

  app.get("/reservations", [isLogged], async (req: Request, res: Response) => {
    const userId = req.query.userId as string | undefined;
    const dates = req.query.dates as string[] | undefined;
    const datesArray = dates
      ? Array.isArray(dates)
        ? dates
        : [dates]
      : undefined;
    console.log({ userId, dates });
    const reservations = await getReservations({
      userId,
      dates: datesArray,
    });
    if (reservations === null) {
      res.status(404).send({ error: "Reservations not found" });
      return;
    }

    res.send({ reservations });
  });

  app.post(
    "/reservation",
    [isLogged],
    express.json(),
    async (req: Request, res: Response) => {
      const { body } = req;
      const reservation = await createReservation(body as STReservation);
      if (!reservation) {
        res.status(400).send({ message: "Error creating reservation" });
        return;
      }
      res.send({ reservation });
    }
  );

  app.delete(
    "/reservation/admin/:id",
    [isLogged],
    express.json(),
    async (req: Request, res: Response) => {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ message: "Missing reservation ID" });
        return;
      }

      try {
        await deleteReservation(id);
        res.send({ message: "Reservation deleted" });
      } catch (e) {
        res.status(400).send({ message: "Error deleting reservation" });
        return;
      }
    }
  );

  return app;
};
