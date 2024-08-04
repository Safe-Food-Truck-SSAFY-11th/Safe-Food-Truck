// src/utils/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

    authDomain: "safe-food-truck-69a19.firebaseapp.com",

    projectId: "safe-food-truck-69a19",
    
    storageBucket: "safe-food-truck-69a19.appspot.com",

    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

    appId: process.env.REACT_APP_FIREBASE_APP_ID,

    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const messaging = getMessaging(app);

export { app, firestore, messaging, getToken , onMessage };
