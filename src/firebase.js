import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDVjB88sVpEG80p9NjbUFv4QBVEjctLjaA",
  authDomain: "coco-fit.firebaseapp.com",
  projectId: "coco-fit",
  storageBucket: "coco-fit.firebasestorage.app",
  messagingSenderId: "707471860218",
  appId: "1:707471860218:web:b745899d61b2efd3d64443",
  measurementId: "G-FGQ63328NW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();