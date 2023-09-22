import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/database';
import { getDatabase, ref, onValue } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX-bOZojSEQfJk-680-JtLsJm-LCcDjJY",
  authDomain: "webapp-prediction.firebaseapp.com",
  projectId: "webapp-prediction",
  storageBucket: "webapp-prediction.appspot.com",
  messagingSenderId: "737646416362",
  appId: "1:737646416362:web:39b1411978f944df89e293"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth()