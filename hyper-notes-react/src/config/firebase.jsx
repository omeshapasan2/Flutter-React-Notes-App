import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChGYvlkeVmbRJ8EkVJGY4pDK5jN404KIU",
  authDomain: "hypernotes-b42d0.firebaseapp.com",
  projectId: "hypernotes-b42d0",
  storageBucket: "hypernotes-b42d0.firebasestorage.app",
  messagingSenderId: "84731507514",
  appId: "1:84731507514:web:71b0019e10a905cd779603",
  measurementId: "G-1VEHFXW6M4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);