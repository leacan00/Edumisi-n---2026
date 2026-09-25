import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwgoVVxvJaQdz6T628KI4Xk-DNRtP_OeE",
  authDomain: "edumision-2026.firebaseapp.com",
  projectId: "edumision-2026",
  storageBucket: "edumision-2026.firebasestorage.app",
  messagingSenderId: "736226771421",
  appId: "1:736226771421:web:6eb71fd992cab0bf39b634"
};

// Inicializamos la app y la base de datos Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
