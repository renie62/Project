import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAerhBwtW3aDx05zxMg-rKVok-vLUoNuJo",
  authDomain: "ecommerce-53be6.firebaseapp.com",
  projectId: "ecommerce-53be6",
  storageBucket: "ecommerce-53be6.appspot.com",
  messagingSenderId: "300247808740",
  appId: "1:300247808740:web:89c7d33c81c058b8ab8af1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
