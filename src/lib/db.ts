import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_F_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_F_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_F_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_F_STORAGE,
  messagingSenderId: process.env.F_MESSAGING,
  appId: process.env.NEXT_PUBLIC_F_APP_ID,
  measurementId: process.env.F_LENGTH,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
