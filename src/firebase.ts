import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_gWgT46m9qZag3ERlY6qeID4uOSLb2bo",
  authDomain: "todo-f7daa.firebaseapp.com",
  projectId: "todo-f7daa",
  storageBucket: "todo-f7daa.firebasestorage.app",
  messagingSenderId: "666890875051",
  appId: "1:666890875051:web:fcb5df739d9ca2b6c507ee",
  measurementId: "G-KZTVT9NTQV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
