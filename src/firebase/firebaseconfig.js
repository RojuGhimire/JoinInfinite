import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8B9BZmgEXzl5-0kqlbNTh8eMphyoITj0",
  authDomain: "joininfinte.firebaseapp.com",
  projectId: "joininfinte",
  storageBucket: "joininfinte.appspot.com",
  messagingSenderId: "169385625023",
  appId: "1:169385625023:web:b1be9556ab6b3b341e0d0a",
  measurementId: "G-QK9X9KNJ8V",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
export {app,db, storage}