import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC-ck6N_PwoyXrtaG3AY-lmljCGo3k9TcA",
  authDomain: "smart-trip-5373b.firebaseapp.com",
  projectId: "smart-trip-5373b",
  storageBucket: "smart-trip-5373b.firebasestorage.app",
  messagingSenderId: "330552946368",
  appId: "1:330552946368:web:4742633fed614205e40725",
  measurementId: "G-YC6D31968B",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
