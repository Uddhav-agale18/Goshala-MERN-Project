// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKJ58fwMyRUb8nAq-6Ynmgf0l-adf9fSw",
  authDomain: "goshala-5b3bc.firebaseapp.com",
  projectId: "goshala-5b3bc",
  storageBucket: "goshala-5b3bc.firebasestorage.app",
  messagingSenderId: "279283771347",
  appId: "1:279283771347:web:c3d86eca4370e16c6a3126",
  measurementId: "G-K67FL46740"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);