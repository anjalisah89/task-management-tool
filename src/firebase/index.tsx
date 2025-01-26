// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkFvFyLAPMh49x4u_kLMYmMZfyme6f8Nk",
  authDomain: "task-management-9d076.firebaseapp.com",
  projectId: "task-management-9d076",
  storageBucket: "task-management-9d076.firebasestorage.app",
  messagingSenderId: "746256339584",
  appId: "1:746256339584:web:c786c5209720adf8fecc65",
  measurementId: "G-CED8TK2XFY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider, signInWithPopup, signOut, onAuthStateChanged };
