// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChE-f5EsMeLMiwmU7tFc9cgnwVuLYG-FM",
  authDomain: "rungta-connect-web.firebaseapp.com",
  projectId: "rungta-connect-web",
  storageBucket: "rungta-connect-web.appspot.com",
  messagingSenderId: "463834609236",
  appId: "1:463834609236:web:f987315e71c9406b569fc1",
  measurementId: "G-064QPYSRET",
  databaseURL: "https://rungta-connect-web-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);