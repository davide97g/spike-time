import express, { Express } from "express";
import { stripe } from "../config/stripe";
import { addBestGuessToUser } from "../features/payments";

const endpointSecret = process.env.STRIPE_CHECKOUT_SIGNING_SECRET;

export const addProRoutes = (app: Express) => {
  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (request, response) => {
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
          await addBestGuessToUser(event.data.object);
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event?.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  );

  return app;
};
