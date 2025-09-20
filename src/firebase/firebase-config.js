// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmAGvFxwqIcBzM8FS5EV90elvvl7R4EZQ",
  authDomain: "lunartype-a25be.firebaseapp.com",
  projectId: "lunartype-a25be",
  storageBucket: "lunartype-a25be.firebasestorage.app",
  messagingSenderId: "332952197791",
  appId: "1:332952197791:web:837c70cf7101a6d853a0aa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FirebaeAuth = getAuth(app);
export const FirebaeDB = getFirestore(app);
