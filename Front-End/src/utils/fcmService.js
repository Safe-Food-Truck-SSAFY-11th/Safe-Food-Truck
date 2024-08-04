// src/utils/fcmService.js

import { messaging, getToken } from './firebase';
import { app } from './firebase.js';



export const getFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('알림 권한이 허용되었습니다.');
      return true;
    } else if (permission === 'denied') {
      console.error('알림 권한이 거부되었습니다.');
    } else {
      console.error('알림 권한 요청이 차단되었습니다.');
    }
  } catch (error) {
    console.error('알림 권한 요청 중 에러 발생:', error);
    throw error;
  }
};

// export const getFcmToken = async () => {
//   try {
//     const token = await getToken(messaging, {
//       vapidKey: process.env.REACT_APP_VAPID_KEY,
//     });

//     if (token) {
//       console.log('발급된 fcm 토큰입니다', token);
//       return token;
//     } else {
//       console.error('fcm토큰 없음 ㅠㅜㅜ');
//       throw new Error('FCM 토큰을 가져올 수 없습니다.');
//     }
//   } catch (error) {
//     console.error('fcm 토큰 가져오기 에러 발생', error);
//     throw error;
//   }
// };
