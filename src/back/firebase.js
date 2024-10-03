// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGYwqKQ-h1bXRgSt5us11mul_RlQ8wIrI",
  authDomain: "mooh-73e37.firebaseapp.com",
  projectId: "mooh-73e37",
  storageBucket: "mooh-73e37.appspot.com",
  messagingSenderId: "933496471187",
  appId: "1:933496471187:web:dab01801480fc5a8e05766",
  measurementId: "G-N3SDZPWYS1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;