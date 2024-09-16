import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";

dotenv.config();

const serviceAccount = process.env.SECRETS_PATH
  ? `${process.env.SECRETS_PATH}/service-account.json`
  : "service-account.json";

// log process dir
console.log("cwd", process.cwd());

// log folders in cwd
fs.readdir(process.cwd(), (err: any, files: any) => {
  console.log("cwd --> files:", files);
});

// log all files in the secrets path
fs.readdir(
  process.env.SECRETS_PATH ?? process.cwd(),
  (err: any, files: any) => {
    // log all files
    console.log("secrets --> files", files);
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
