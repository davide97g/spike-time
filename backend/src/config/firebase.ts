import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

const serviceAccount =
  process.env.MODE === "DEVELOPMENT"
    ? `${process.env.SECRETS_PATH}/service-account.json`
    : JSON.parse(process.env.SERVICE_ACCOUNT ?? "{}");

export const initializeFirebaseApp = () => {
  try {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};
