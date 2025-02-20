// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1Xxt78WuY5mELlc4GdUBLsn3gbkgJZqQ",
  authDomain: "netflixgpt-5ef74.firebaseapp.com",
  projectId: "netflixgpt-5ef74",
  storageBucket: "netflixgpt-5ef74.firebasestorage.app",
  messagingSenderId: "905900226097",
  appId: "1:905900226097:web:ae122732aba3f33619c710",
  measurementId: "G-5QH4RV1JVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);