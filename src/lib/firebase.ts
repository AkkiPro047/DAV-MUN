// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// IMPORTANT: This is a public configuration and is safe to expose.
// Security is enforced by Firebase Security Rules and App Check.
const firebaseConfig = {
  apiKey: "AIzaSyDtt1kMbg4y22vWUBlgwPhdgMDaguSkDPI",
  authDomain: "studio-7298342617-871fd.firebaseapp.com",
  projectId: "studio-7298342617-871fd",
  storageBucket: "studio-7298342617-871fd.appspot.com",
  messagingSenderId: "206970310078",
  appId: "1:206970310078:web:5fd9288206ed833a367def"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export { app };
