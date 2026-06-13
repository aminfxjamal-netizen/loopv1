import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF6vTxlcMpC2xzXRGtMOy0j26VVRzLF3k",
  authDomain: "loop-workspace-db95a.firebaseapp.com",
  projectId: "loop-workspace-db95a",
  storageBucket: "loop-workspace-db95a.firebasestorage.app",
  messagingSenderId: "409507453358",
  appId: "1:409507453358:web:8de2afe48e6ce3c66bd03f",
  measurementId: "G-7RTXB895P7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database to use in your app
export const db = getFirestore(app);