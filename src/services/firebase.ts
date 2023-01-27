import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCccbpiR_bgI1aQtyIEKdL6NxJ_hAiQMdY",
  authDomain: "delish-mobile.firebaseapp.com",
  projectId: "delish-mobile",
  storageBucket: "delish-mobile.appspot.com",
  messagingSenderId: "1088542844397",
  appId: "1:1088542844397:web:ffea608cf7f1888ab573e4",
  measurementId: "G-BBXFS770P6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
