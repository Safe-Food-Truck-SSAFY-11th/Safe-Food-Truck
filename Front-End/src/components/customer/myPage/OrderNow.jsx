import React , { useEffect } from 'react';
import styles from './OrderNow.module.css';
import { useCustomerEventStore } from 'store/eventStore';
import customerOrderStore from 'store/orders/customerOrderStore'


const OrderNow = ({ memberInfo, joonbiOrders }) => {
  
  const { nowOrder , getOrderDetails } = customerOrderStore();

  const { customerOrderNotice, setCustomerOrderNotice, customerOrderDetail } = useCustomerEventStore();
  console.log(joonbiOrders)
  const recentOrders = joonbiOrders?.customerPreparingOrderResponseDtos;
  const recentOrder = recentOrders[recentOrders.length-1]
  
  console.log(recentOrder)

  console.log(recentOrders)

  useEffect(() => {
    getOrderDetails(recentOrder.orderId); 
  }, []);
  
  useEffect(() => {

    if (customerOrderNotice) {
      getOrderDetails(recentOrder.orderId);
      setCustomerOrderNotice(false);
    }
    
  }, [customerOrderNotice]);

  if (!joonbiOrders) {
    return (
      <div className={styles.container}>
        <div className={styles.noOrder}>
          {memberInfo.nickname} 님이 주문한 음식이 없어요 😥
        </div>
      </div>
    );
  }

  // 주문 상태에 따른 메시지와 스타일
  const statusMessage = () => {
    if (recentOrder.status === 'pending') {
      return { message: '주문을 확인하고 있어요!', color: '#FF7F50' };
    }
    else if (recentOrder.status === 'accepted') {
      if (recentOrder.cookingStatus === 'completed') {
        return { message: '준비 완료 됬어요!', color: 'green' };
      }
      else if (recentOrder.cookingStatus === 'waiting' || recentOrder.cookingStatus === 'preparing') {
        return { message: '메뉴를 준비중이에요!', color: '#FF7F50' };
      }
    }
    else if (recentOrder.status === 'rejected') {
      return { message: '주문을 거절했어요', color: 'red' };
    }
  }

  const { message, color } = statusMessage();

  // orderTime을 월, 일, 시, 분 형식으로 변환하는 함수
  const formatOrderTime = (orderTime) => {
    const date = new Date(orderTime);
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
      <div className={styles.header}>
        <span className={styles.status} style={{ color: color }}>{message}</span>
        <span className={styles.orderTime}>주문 시간 : {formatOrderTime(recentOrder.orderTime)}</span>
      </div>
       <div className={styles.orderDetails}>
        <p>
          {recentOrder.orderTitle} 
        </p>       
      </div>
      </div>
    </div>
  );
};

export default OrderNow;
