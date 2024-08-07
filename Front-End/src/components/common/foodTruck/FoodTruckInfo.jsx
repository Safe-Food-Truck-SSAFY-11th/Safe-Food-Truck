import React from 'react';
import styles from './FoodTruckInfo.module.css';

function FoodTruckInfo({ truck }) {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>푸드트럭 사진</h3>
        <img
          src={truck.imageUrl}
          alt={truck.name}
          className={styles.truckImage}
        />
      </div>
      <div className={styles.section}>
        <h3>푸드트럭 정보</h3>
        <p>상호명 : {truck.name}</p>
        <p>운영시간: {truck.operatingHours}</p>
        <p>전화번호: {truck.phoneNumber}</p>
      </div>
      <div className={styles.section}>
        <h3>가게 통계</h3>
        <p>주문 수: {truck.orderCount}개</p>
        <p>리뷰: {truck.reviewCount}개</p>
        <p>찜: {truck.favoriteCount}개</p>
      </div>
    </div>
  );
}

export default FoodTruckInfo;
