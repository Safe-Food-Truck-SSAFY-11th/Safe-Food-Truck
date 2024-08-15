import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderPast.module.css';
import useReviewStore from 'store/reviews/useReviewStore';

const OrderPast = ({ memberInfo, pastOrders , myReviews}) => {
  const navigate = useNavigate();
  const { initCurrentReview } = useReviewStore();

  const orders = pastOrders.customerOrderResponseDtos;
  const reviews = myReviews.reviewResponseDtos;
  
  // status가 accepted인 주문만 필터링
  const acceptedOrders = orders.filter(order => order.status === 'accepted');
  
  // 이미 작성된 리뷰의 orderId 리스트를 추출
  const reviewedOrderIds = reviews?.map(review => review.orderId);
  
  // 컴포넌트가 처음 마운트될 때만 상태 초기화
  useEffect(() => {
    initCurrentReview();
  }, [initCurrentReview]); // initCurrentReview를 의존성 배열에 추가
  
  // 과거 주문 내역을 역순으로 정렬
  const results = [...acceptedOrders].reverse();

  const handleReviewButtonClick = (orderId) => {
    navigate(`/createReview/${orderId}`, { state: { memberInfo } });
  };  
  
  return (
    <div className={styles.container}>
      {results.length > 0 ? (
        <>
          <h3 className={styles.reviewHeader}>{memberInfo.nickname} 🖐 님의 구매 내역 {results.length}개</h3>
          {results?.map((order) => (
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
                  disabled={reviewedOrderIds.includes(order.orderId)} // 리뷰가 이미 작성된 주문이라면 버튼 비활성화
                >
                  리뷰 쓰기
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className={styles.noReviewHeader}>{memberInfo.nickname} 님의 구매 내역이 없습니다 😅</p>
      )}
    </div>
  );
};

export default OrderPast;
