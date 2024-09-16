import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

const serviceAccount = `${process.env.SECRETS_PATH}/service-account.json`;

// log process dir
console.log(process.cwd());

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
