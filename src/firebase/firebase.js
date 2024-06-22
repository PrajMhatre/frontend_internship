// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAewW88cTOJoi7NKy7oN7JyZtovWEf4gB0",
  authDomain: "internship-431c0.firebaseapp.com",
  projectId: "internship-431c0",
  storageBucket: "internship-431c0.appspot.com",
  messagingSenderId: "498947347731",
  appId: "1:498947347731:web:c643b0085c8637841bb6e6",
  measurementId: "G-W2FYDXB7LY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export { auth, provider, signInWithPopup };