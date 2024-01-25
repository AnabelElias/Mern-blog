// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-20418.firebaseapp.com",
  projectId: "mern-blog-20418",
  storageBucket: "mern-blog-20418.appspot.com",
  messagingSenderId: "756766982651",
  appId: "1:756766982651:web:6c578c9d681952b1378b5e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);