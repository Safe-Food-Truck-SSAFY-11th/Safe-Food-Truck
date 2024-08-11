import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderPast.module.css';
import useReviewStore from 'store/reviews/useReviewStore';

const OrderPast = ({ memberInfo, pastOrders }) => {
  const navigate = useNavigate();
  const { initCurrentReview } = useReviewStore();

  // 컴포넌트가 처음 마운트될 때만 상태 초기화
  useEffect(() => {
    initCurrentReview();
  }, [initCurrentReview]); // initCurrentReview를 의존성 배열에 추가
  // 과거 주문 내역을 역순으로 정렬
  const results = [...pastOrders.customerOrderResponseDtos].reverse();

  const handleReviewButtonClick = (orderId) => {
    navigate(`/createReview/${orderId}`, { state: { memberInfo } });
  };  
  return (
    <div className={styles.container}>
      {results.length > 0 ? (
        <>
          <h3>{memberInfo.nickname} 🖐 님이 구매했던 내역이에요!</h3>
          {results.map((order) => (
            <div key={order.orderId} className={styles.orderCard}>
              <div className={styles.orderContent}>
                <div className={styles.orderDetails}>
                  <h4>{order.storeName}</h4>
                  <p>
                    {order.menuResponseDtos && order.menuResponseDtos.length > 0 ? (
                      order.menuResponseDtos.length === 1
                        ? `${order.menuResponseDtos[0].name} ${order.amount / order.menuResponseDtos[0].price}개` // 메뉴가 1개인 경우
                        : `${order.menuResponseDtos[0].name} 외 ${order.menuResponseDtos.length - 1}건` // 메뉴가 2개 이상인 경우
                    ) : (
                      '메뉴 정보가 없습니다' // menuResponseDtos가 비어있는 경우
                    )}
                  </p>
                  <p>{order.amount} 원</p>
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
