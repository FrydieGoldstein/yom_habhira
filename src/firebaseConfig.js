import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIRBASE_API_KEY,
  authDomain: "yotzim-basalon-dev.firebaseapp.com",
  projectId: "yotzim-basalon-dev",
  storageBucket: "yotzim-basalon-dev.appspot.com",
  messagingSenderId: "974298098383",
  appId: "1:974298098383:web:c00c85aff978aeb823e5ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
