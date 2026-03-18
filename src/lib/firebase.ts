import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDVoeHN9H6W-NUFIQs1GIU-V5StJetxAKw",
  authDomain: "darknetra.firebaseapp.com",
  projectId: "darknetra",
  storageBucket: "darknetra.firebasestorage.app",
  messagingSenderId: "341019403941",
  appId: "1:341019403941:web:3989605d3c2eece9560f4c",
  measurementId: "G-N9BE0QZ9TB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
