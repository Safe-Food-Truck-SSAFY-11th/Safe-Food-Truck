// src/services/firestoreService.js
import { firestore } from '../firebase/firebase';
import axios from 'axios'; // FCM 서버로 요청을 보내기 위해 사용

// Firebase 콘솔에서 확인한 FCM 서버 키를 여기에 추가합니다.
const FCM_SERVER_KEY = 'YOUR_FCM_SERVER_KEY';

// 새로운 주문 추가
export function addOrder(orderInfo) {
  return firestore.collection('orders').add({
    customerEmail: orderInfo.email,
    fcmToken: orderInfo.fcmToken,
    foodName: orderInfo.name,
    isFinished: false,
    quantity: orderInfo.quantity,
  });
}

// 주문 상태 완료로 업데이트 하기
export function updateOrderStatus(orderId) {
  const currentOrder = firestore.collection('orders').doc(orderId);

  return currentOrder.update({
    isFinished: true
  }).then(() => {
    // 주문 상태가 업데이트되면 FCM 알림 전송
    currentOrder.get().then(doc => {
      if (doc.exists) {
        const orderData = doc.data();
        sendPushNotification(orderData.fcmToken, '주문이 준비 됬어요!', `용훈 님이 주문한 ${orderData.foodName}가 픽업을 기다리고 있어요!.`);
      }
    });
  });
}

// 실시간 리스너 설정
export function listenForOrderUpdates(orderId, callback) {
  const orderRef = firestore.collection('orders').doc(orderId);

  return orderRef.onSnapshot((doc) => {
    if (doc.exists) {
      const orderData = doc.data();
      callback(orderData);
    } else {
      console.log('그런거 없음...');
    }
  });
}

// 푸시 알림 전송 함수
function sendPushNotification(fcmToken, title, body) {
  const payload = {
    to: fcmToken,
    notification: {
      title: title,
      body: body
    }
  };

  axios.post('https://fcm.googleapis.com/fcm/send', payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${FCM_SERVER_KEY}`
    }
  }).then(response => {
    console.log('Successfully sent message:', response);
  }).catch(error => {
    console.error('Error sending message:', error);
  });
}
