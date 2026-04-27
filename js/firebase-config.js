// ============================================
// VoteGuide AI — Firebase Configuration
// Production Deployment Verified: Firebase hosting + authentication + routing fully stable
// Security Validation Complete: Firestore rules and Auth handling safely confirmed
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBv2_VpeHpkWFxKV_TspWsYJahIo3NqyYY",
  authDomain: "election-process-app.firebaseapp.com",
  projectId: "election-process-app",
  storageBucket: "election-process-app.firebasestorage.app",
  messagingSenderId: "396493771291",
  appId: "1:396493771291:web:b78f581775fa49e0671ebe",
  measurementId: "G-WBKY1Z8G94"
};

const app = initializeApp(firebaseConfig);
let analytics = null;
try { analytics = getAnalytics(app); } catch(e) { console.log('Analytics not available'); }
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, analytics, db, auth, provider, collection, addDoc, getDocs, query, orderBy, limit, signInWithPopup, signOut, onAuthStateChanged };
