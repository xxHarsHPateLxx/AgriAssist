// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA595PAUkG9QBXiwByhg0l9AUz4WknbNMw",
  authDomain: "agriassist-4bd5b.firebaseapp.com",
  projectId: "agriassist-4bd5b",
  storageBucket: "agriassist-4bd5b.firebasestorage.app",
  messagingSenderId: "879441990194",
  appId: "1:879441990194:web:ad7bc727e7b6667c91222b",
  measurementId: "G-PS37SC631H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();