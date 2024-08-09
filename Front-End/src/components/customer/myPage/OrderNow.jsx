import React from 'react';
import styles from './OrderNow.module.css';

const OrderNow = ({ memberInfo, nowOrder }) => {

  // nowOrder가 없을 때
  if (!nowOrder) {
    return (
      <div className={styles.container}>
        <div className={styles.noOrder}>
          {memberInfo.nickname} 님이 주문한 음식이 없어요 😥
        </div>
      </div>
    );
  }

  // Cooking status에 따른 메시지 출력
  let statusMessage = '';
  switch (nowOrder.cookingStatus) {
    case 'waiting':
      statusMessage = '매장에서 주문을 확인하고 있어요';
      break;
    case 'preparing':
      statusMessage = '메뉴를 준비중이에요';
      break;
    case 'completed':
      statusMessage = '조리가 완료 됬어요!';
      break;
    default:
      statusMessage = '주문 상태를 확인할 수 없습니다.';
  }
  
  const orderMenus = nowOrder.orderMenuListResponseDto.orderMenuResponseDtos;
  const menuCount = orderMenus.length;
  const menuText = menuCount > 1
    ? `${orderMenus[0].menuName} 외 ${menuCount - 1}건`
    : `${orderMenus[0].menuName} ${orderMenus[0].count}개`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.status}>{statusMessage}</span>
        <span className={styles.orderTime}>주문 시간 : {nowOrder.orderTime}</span>
      </div>
      <div className={styles.orderDetails}>
        <p>{menuText}</p>
      </div>
    </div>
  );
};

export default OrderNow;
