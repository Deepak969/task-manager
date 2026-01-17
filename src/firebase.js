import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSWt9L9bjuzuekToJGvQoNxnDR6W1NaTU",
  authDomain: "task-manager-c284f.firebaseapp.com",
  projectId: "task-manager-c284f",
  storageBucket: "task-manager-c284f.appspot.com",
  messagingSenderId: "411035715781",
  appId: "1:411035715781:web:4b194d5edf41c76ca088ac"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// 🔑 AUTO LOGIN
signInAnonymously(auth)
  .then(() => console.log("Firebase Authenticated"))
  .catch((error) => console.error(error));