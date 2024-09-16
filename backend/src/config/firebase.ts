import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";

dotenv.config();

const serviceAccount = `${process.env.SECRETS_PATH}/service-account.json`;

// log process dir
console.log(process.cwd());

// log all files in the secrets path
fs.readdir(
  process.env.SECRETS_PATH || process.cwd(),
  (err: any, files: any) => {
    files.forEach((file: any) => {
      console.log(file);
    });
  }
);

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
