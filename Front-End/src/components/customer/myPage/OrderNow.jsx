import React from 'react';
import styles from './OrderNow.module.css';

const OrderNow = ({ memberInfo, nowOrder }) => {
  if (!nowOrder) {
    return (
      <div className={styles.container}>
        <div className={styles.noOrder}>
          {memberInfo.nickname} 님이 주문한 음식이 없어요 😥
        </div>
      </div>
    );
  }

  // 주문 상태에 따른 메시지
  const statusMessage = () => {

    if (nowOrder.status === 'pending') {

      return '매장에서 주문을 확인하고 있어요';

    }
    else if (nowOrder.status === 'accepted') {

      switch(nowOrder.cookingStatus) {
        case 'waiting':
          return '메뉴를 준비중이에요';
        case 'complete':
          return '메뉴가 준비됬어요';
        default :
          return '진행중인 주문을 확인할 수 없어요'
      }
      
    }
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.status}>{statusMessage()}</span>
        <span className={styles.orderTime}>주문 시간 : {nowOrder.orderTime}</span>
      </div>
      <div className={styles.orderDetails}>
        <p>
          {nowOrder.orderMenuListResponseDto.orderMenuResponseDtos[0]?.menuName} 
          {nowOrder.orderMenuListResponseDto.orderMenuResponseDtos.length > 1 &&
            ` 외 ${nowOrder.orderMenuListResponseDto.orderMenuResponseDtos.length - 1}건`}
          &nbsp; {nowOrder.orderMenuListResponseDto.orderMenuResponseDtos[0]?.count}개
        </p>       
      </div>
    </div>
  );
};

export default OrderNow;
