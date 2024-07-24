import React from 'react';
import styles from './FoodTruckInfo.module.css';

function FoodTruckInfo() {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoBox}>
        <h2>푸드트럭 사진</h2>
        <div className={styles.imagePlaceholder}></div>
      </div>
      <div className={styles.infoBox}>
        <h2>푸드트럭 정보</h2>
        <p>상호명: 맛있는 닭꼬치 푸드트럭</p>
        <p>운영시간: 월 - 수, 금 15:00 ~ 22:00</p>
        <p>전화번호: 010 - 1234 - 5678</p>
      </div>
      <div className={styles.infoBox}>
        <h2>가게 통계</h2>
        <p>주문 수: 1,234개</p>
        <p>리뷰 수: 78개</p>
        <p>찜: 144개</p>
      </div>
    </div>
  );
}

export default FoodTruckInfo;
