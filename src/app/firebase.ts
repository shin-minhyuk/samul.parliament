// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpOuUx_2UA9xNI9CFsPldTCrvAm95Nnms",
  authDomain: "samuluiuihoe.firebaseapp.com",
  projectId: "samuluiuihoe",
  storageBucket: "samuluiuihoe.firebasestorage.app",
  messagingSenderId: "268812007542",
  appId: "1:268812007542:web:1fc91cee323787735ec757",
  measurementId: "G-C44F2Z1K0Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
