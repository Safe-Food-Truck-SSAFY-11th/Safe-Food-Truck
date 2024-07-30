import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styles from './OrderNow.module.css';

const OrderNow = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // api 추가되면 사용할 로직
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await axios.get('/api/order/current'); 
//         setOrder(response.data);
//       } catch (error) {
//         console.error("Error fetching order", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, []);

useEffect(() => {
    const fetchOrder = async () => {
  
      const dummyOrder = {
        orderTime: '2024.07.17 17:39:59',
        foodName: '핵불닭 타코야끼 8알',
      };


      setTimeout(() => {
        setOrder(dummyOrder);
        setLoading(false);
      }, 1000);
    };

    fetchOrder();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return (
    <div className={styles.container}>
      <div className={styles.noOrder}>주문한 음식이 없어요 😥</div>
    </div>
  )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.status}>주문 진행 중</span>
        <span className={styles.orderTime}>주문한 시간 : {order.orderTime}</span>
      </div>
      <div className={styles.orderDetails}>
        <p>{order.foodName}</p>
      </div>
    </div>
  );
};

export default OrderNow;
