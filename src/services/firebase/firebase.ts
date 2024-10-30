// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcgd7-rZibEiUcCRGtd4c-TZnE-yGcGIg",
  authDomain: "data-render-app.firebaseapp.com",
  projectId: "data-render-app",
  storageBucket: "data-render-app.appspot.com",
  messagingSenderId: "1097577812953",
  appId: "1:1097577812953:web:1781c96343de087faebfc8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getDatabase(firebaseApp);

