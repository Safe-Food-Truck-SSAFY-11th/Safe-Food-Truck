import React, { useEffect } from 'react';
import styles from './FoodTruckInfo.module.css';
import useFoodTruckStore from 'store/trucks/useFoodTruckStore';

function FoodTruckInfo({ truck, reviews }) {
  const { getFoodTruckLikes, likes } = useFoodTruckStore();
  console.log(truck);

  useEffect(() => {
      getFoodTruckLikes(truck.storeId);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>푸드트럭 사진</h3>
        {truck.storeImageDto?.savedUrl ? (
          <img
            src={truck.storeImageDto.savedUrl}
            alt={truck.name}
            className={styles.truckImage}
          />
        ) : (
          <p>이미지 없음</p>
        )}
      </div>
      <div className={styles.section}>
        <h3>푸드트럭 정보</h3>
        <p>상호명 : {truck.name}</p>
        <p>운영시간: {truck.operatingHours}</p>
        <p>전화번호: {truck.phoneNumber}</p>
      </div>
      <div className={styles.section}>
        <h3>가게 통계</h3>
        <p>리뷰: {reviews.length} 개</p>
        <p>찜: {likes?.favoriteCount || 0} 개</p>
      </div>
    </div>
  );
}

export default FoodTruckInfo;
