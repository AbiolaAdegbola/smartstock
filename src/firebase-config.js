// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWbxsr8hS0JumK89gAovTi_22GFk5b-S0",
  authDomain: "smartstock-61b35.firebaseapp.com",
  projectId: "smartstock-61b35",
  storageBucket: "smartstock-61b35.firebasestorage.app",
  messagingSenderId: "753468497419",
  appId: "1:753468497419:web:355b1c371157a2706ff10e",
  measurementId: "G-S5P6EHPWLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const analytics = getAnalytics(app);

export default db;