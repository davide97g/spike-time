import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGtGOIDYDhhYlDAN7zXyzqQ-l9qQSyNe0",
  authDomain: "spike-time.firebaseapp.com",
  projectId: "spike-time",
  storageBucket: "spike-time.appspot.com",
  messagingSenderId: "671571139773",
  appId: "1:671571139773:web:a72fc727d579399d0e6bd4",
  measurementId: "G-HZCM8LQHE2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LfHgkoqAAAAACUFaYoTYZ4EnqAApTfV8x5wJ3co"),
});
getAnalytics(app);
