// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration, provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyA7DLvLVP5R6JY6YZhxEYDuTe32mf35V1U",
  authDomain: "nested-bf1cf.firebaseapp.com",
  projectId: "nested-bf1cf",
  storageBucket: "nested-bf1cf.firebasestorage.app",
  messagingSenderId: "817000403371",
  appId: "1:817000403371:web:2fc9abde4824836d6002ee",
  measurementId: "G-NWM982WNDP"
};

// Initialize Firebase for client-side usage
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
