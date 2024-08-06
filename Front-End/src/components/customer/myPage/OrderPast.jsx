import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderPast.module.css';

const OrderPast = ({ memberInfo, pastOrders }) => {
  const navigate = useNavigate();

  // pastOrders와 pastOrders.orders가 정의되어 있는지 확인
  const myPastOrders = pastOrders && pastOrders.orders ? pastOrders.orders : [];

  const handleReviewButtonClick = (orderId) => {
    navigate(`/createReview/${orderId}`, { state: { memberInfo } });
  };

  return (
    <div className={styles.container}>
      {myPastOrders.length > 0 ? (
        <>
          <h3>{memberInfo.nickname} 🖐 님이 구매했던 내역이에요!</h3>
          {myPastOrders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderContent}>
                <img src={order.image} alt={order.name} className={styles.foodImage} />
                <div className={styles.orderDetails}>
                  <h4>{order.name}</h4>
                  <p>{order.description}</p>
                  <p>{order.price.toLocaleString()}원</p>
                  <p>{order.quantity} 개</p>
                </div>
                <button
                  className={styles.reviewButton}
                  onClick={() => handleReviewButtonClick(order.id)}
                >
                  리뷰 쓰기
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>{memberInfo.nickname} 님의 구매 내역이 없습니다 😅</p>
      )}
    </div>
  );
};

export default OrderPast;
