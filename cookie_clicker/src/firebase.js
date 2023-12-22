import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOT5UUOOsLBRVJU5dduXEyZ7pn8DNMfBA",
  authDomain: "cookieclicker-fba5d.firebaseapp.com",
  projectId: "cookieclicker-fba5d",
  storageBucket: "cookieclicker-fba5d.appspot.com",
  messagingSenderId: "209352805096",
  appId: "1:209352805096:web:28bbe15fbc957653aa975d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);