import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmTVYwJ0w986TYlEh08ZsBbJZ-S0L36lg",
  authDomain: "hardware-store-18bf4.firebaseapp.com",
  projectId: "hardware-store-18bf4",
  storageBucket: "hardware-store-18bf4.appspot.com",
  messagingSenderId: "234875029958",
  appId: "1:234875029958:web:4e20b2cad4960fc6860ac7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()