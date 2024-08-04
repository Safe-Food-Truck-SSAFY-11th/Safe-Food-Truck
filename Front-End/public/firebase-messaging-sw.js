// public/firebase-messaging-sw.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getMessaging, onBackgroundMessage } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-sw.js';

const firebaseConfig = {
    apiKey: "AIzaSyDbvwKIIAijMA1jrhrgSoHKltV-7g0Ign8",

    authDomain: "safe-food-truck-69a19.firebaseapp.com",

    projectId: "safe-food-truck-69a19",
    
    storageBucket: "safe-food-truck-69a19.appspot.com",

    messagingSenderId: "337521228464",

    appId: "1:337521228464:web:8c9d6250bcda5578295975",

    measurementId: "G-24FHTW1GQH"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] 백그라운드 메시지 받기 ', payload);

  const notificationTitle = payload.notification?.title || '백그라운드 메시지 제목';
  const notificationOptions = {
    body: payload.notification?.body || '내용 입니당.',
    icon: payload.notification?.icon || '/firebase-logo.png'
  };

  
  self.registration.showNotification(notificationTitle, notificationOptions);
});
