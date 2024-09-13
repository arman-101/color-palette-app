import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBviMinSqH1UYGHXbRzS9HF4xd0ypYdBIM",
    authDomain: "color-palette-91a8d.firebaseapp.com",
    projectId: "color-palette-91a8d",
    storageBucket: "color-palette-91a8d.appspot.com",
    messagingSenderId: "475430284901",
    appId: "1:475430284901:web:18e133a515d5f99d7ce08c",
    measurementId: "G-VJTV2N8X7P"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };