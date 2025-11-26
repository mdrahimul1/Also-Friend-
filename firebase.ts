import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARAZ5NOgMSmo2vMd868tvs1UopNYoTuds",
  authDomain: "also-friend.firebaseapp.com",
  databaseURL: "https://also-friend-default-rtdb.firebaseio.com",
  projectId: "also-friend",
  storageBucket: "also-friend.firebasestorage.app",
  messagingSenderId: "161538634150",
  appId: "1:161538634150:web:7c6d9d1dba27d45d291f67",
  measurementId: "G-5S4K2R7C15"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
