// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlNFNPk1NqvcL9uxjITi5V3DJn4HkBUWo",
  authDomain: "oikomus-b0630.firebaseapp.com",
  projectId: "oikomus-b0630",
  storageBucket: "oikomus-b0630.firebasestorage.app",
  messagingSenderId: "1097454786212",
  appId: "1:1097454786212:web:2b08c2efd32c716d37b831",
  measurementId: "G-X1V9HYF7XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics may not work in SSR, so we need to check if window is defined
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics }; 