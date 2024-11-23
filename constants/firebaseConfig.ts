import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDet6-6b-G2hM2IRZlnMtK1tIAnHt03RBI",
    authDomain: "sanisimo.firebaseapp.com",
    projectId: "sanisimo",
    storageBucket: "sanisimo.firebasestorage.app",
    messagingSenderId: "154847434169",
    appId: "1:154847434169:web:ce0ce0f9309a09e5741268"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

connectFirestoreEmulator(db, "localthost", 8080);
export {db, auth, app};