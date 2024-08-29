// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTtcmmbLmkVXsro2SrJbv1NHFgby6r9OE",
  authDomain: "react-training-e22ad.firebaseapp.com",
  projectId: "react-training-e22ad",
  storageBucket: "react-training-e22ad.appspot.com",
  messagingSenderId: "264522225549",
  appId: "1:264522225549:web:826099fdf86bb010c30fc4",
  measurementId: "G-EDZ0P5RX7J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
