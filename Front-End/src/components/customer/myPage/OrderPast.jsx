import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderPast.module.css';

const OrderPast = ({ memberInfo, pastOrders }) => {
  const navigate = useNavigate();

  const results = [...pastOrders.customerOrderResponseDtos].reverse();

  const handleReviewButtonClick = (orderId) => {
    navigate(`/createReview/${orderId}`, { state: { memberInfo } });
  };

  return (
    <div className={styles.container}>
      {results.length > 0 ? (
        <>
          <h3>{memberInfo.nickname} 🖐 님이 구매했던 내역이에요!</h3>
          {results.map(order => (
            <div key={order.orderId} className={styles.orderCard}>
              <div className={styles.orderContent}>
                <div className={styles.orderDetails}>
                  <h4>{order.storeName}</h4>
                  {order.menuResponseDtos.map(menu => (
                    <div key={menu.menuId} className={styles.menuDetails}>
                      {menu.menuImageDto ? (
                        <img
                          src={menu.menuImageDto.savedUrl}
                          alt={`Menu Image ${menu.menuId}`}
                          className={styles.menuImage}
                        />
                      ) : (
                        <p>사진</p>
                      )}
                      <p>{menu.name} {order.amount / menu.price} 개 </p>
                      <p>{order.amount} 원</p>
                    </div>
                  ))}
                </div>
                <button
                  className={styles.reviewButton}
                  onClick={() => handleReviewButtonClick(order.orderId)}
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
