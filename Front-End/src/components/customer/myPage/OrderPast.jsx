import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderPast.module.css';

const OrderPast = ({memberInfo}) => {
  const navigate = useNavigate();

  const pastOrders = [
    {
      id: 1,
      name: '맛있는 닭꼬치',
      description: '기본 닭꼬치',
      price: 4000,
      quantity: 1,
      image: '/images/chicken-skewer.png', // 이미지 경로 예시
    },
    {
      id: 2,
      name: '맛있는 닭꼬치',
      description: '기본 닭꼬치',
      price: 4000,
      quantity: 1,
      image: '/images/chicken-skewer.png', // 이미지 경로 예시
    },
    {
      id: 3,
      name: '맛있는 닭꼬치',
      description: '기본 닭꼬치',
      price: 4000,
      quantity: 1,
      image: '/images/chicken-skewer.png', // 이미지 경로 예시
    },
  ];

  const handleReviewButtonClick = () => {
    navigate(`/review`);
  };

  return (
    <div className={styles.container}>
      <h3>{memberInfo.nickname} 🖐 님이 구매했던 내역이에요!</h3>
      {pastOrders.map(order => (
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
    </div>
  );
};

export default OrderPast;
