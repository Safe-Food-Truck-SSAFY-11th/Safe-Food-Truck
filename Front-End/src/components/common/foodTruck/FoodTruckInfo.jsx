import React, { useEffect } from 'react';
import styles from './FoodTruckInfo.module.css';
import useFoodTruckStore from 'store/trucks/useFoodTruckStore';
import defaultImage from 'assets/images/truck-img.png'; 

function FoodTruckInfo({ truck, reviews, selectedTruckSchedule, isMeet }) {
  const { getFoodTruckLikes, likes } = useFoodTruckStore();

  const daysOfWeek = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

  const scheduleList = selectedTruckSchedule.scheduleList;

  useEffect(() => {
    getFoodTruckLikes(truck.storeId);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>푸드트럭 사진</h3>
        <hr/>
        {truck.storeImageDto?.savedUrl && truck.storeImageDto.savedUrl !== 'empty' ? (
          <img
            src={truck.storeImageDto.savedUrl}
            alt={truck.name}
            className={styles.truckImage}
          />
        ) : (
          <img
            src={defaultImage}
            alt="디폴트 이미지"
            className={styles.truckImage}
          />
        )}
      </div>
      <div className={styles.section}>
        <h3>영업 스케줄</h3>
        <hr/>
        {scheduleList && scheduleList.length > 0 ? (
          <ul>
            {scheduleList.map((schedule, index) => (
              <li key={index}>
                <strong>{daysOfWeek[schedule.day]}:</strong> {schedule.address}
                <br/>
                <span>상세 주소 : {schedule.addAddress}</span>
                <hr/>
              </li>
            ))}
          </ul>
        ) : (
          <p>스케줄 정보가 없습니다.</p>
        )}
      </div>
      <div className={styles.section}>
        <h3>가게 통계</h3>
        <hr/>
        <p>{isMeet ? '예전에 만났던 푸드트럭이에요!' : '만난 적 없는 푸드트럭이에요!'}</p>
        <p>리뷰: {reviews.length} 개</p>
        <p>찜: {likes?.favoriteCount || 0} 개</p>
      </div>
    </div>
  );
}

export default FoodTruckInfo;
