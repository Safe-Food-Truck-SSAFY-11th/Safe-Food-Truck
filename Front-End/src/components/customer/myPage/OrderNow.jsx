import React, { useEffect } from 'react';
import styles from './OrderNow.module.css';
import useFoodTruckStore from 'store/trucks/useFoodTruckStore';

const OrderNow = ({ memberInfo, nowOrder }) => {

// 푸드트럭 이름 가져오려고 스토어 호출
const { getFoodTruck , selectedTruck } = useFoodTruckStore();

// 어느 푸드트럭에서 음식 준비중인지 표시하려고 함수 호출
useEffect(() => {
  getFoodTruck(nowOrder?.storeId)
},[])

  // 현재 진행중인 주문이 없을 때
  if (!nowOrder) {
    return (
      <div className={styles.container}>
        <div className={styles.noOrder}>
          {memberInfo.nickname} 님이 주문한 음식이 없어요 😥
        </div>
      </div>
    );
  }

  // 현재 주문 진행 상태에 맞춰서 텍스트 변동 시켜서 출력
  let statusMessage = '';
  switch (nowOrder.cookingStatus) {
    case 'waiting':
      statusMessage = '주문을 확인하고 있어요';
      break;
    case 'preparing':
      statusMessage = '음식을 준비중이에요';
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
        <p>{selectedTruck.name}에서 {menuText} 주문 했어요</p>
      </div>
    </div>
  );
};

export default OrderNow;
