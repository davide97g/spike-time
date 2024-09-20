import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { addAdminRoutes } from "./api/admin";
import { addLoggedRoutes } from "./api/logged";
import { addPublicRoutes } from "./api/public";
import { initializeFirebaseApp } from "./config/firebase";

dotenv.config();

initializeFirebaseApp();

const app = express();

const allowedOrigins = [
  "http://localhost:8080",
  "https://spike-time.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

const port = process.env.PORT;

// **** PUBLIC ****
addPublicRoutes(app);

// **** LOGGED USERS ****
addLoggedRoutes(app);

// **** ADMIN ****
addAdminRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
