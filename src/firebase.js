import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_AChmrd6xdWZljHT4sxzxkB1qXaFkEKg",
  authDomain: "youngseon-industry-ed537.firebaseapp.com",
  projectId: "youngseon-industry-ed537",
  storageBucket: "youngseon-industry-ed537.appspot.com",
  messagingSenderId: "618437334083",
  appId: "1:618437334083:web:c9f741c8eaadfa449970f6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
