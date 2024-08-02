import React from 'react';
import styles from './MyJjim.module.css';

const MyJjim = ( {memberInfo} ) => {

  // api 생성되면 찜한 푸드트럭 가져와서 여기다 담을거에여
  const likedFoodTrucks = [];

  return (
    <div className={styles.container}>
      <h3>{memberInfo.nickname} 님이 찜한 푸드트럭이에요!</h3>
      <ul>
        {/* 찜 푸드트럭 가져오면 반복문 돌면서 리스트업 시킬겁니당*/}
        {likedFoodTrucks.map(truck => (
          <li key={truck.id} className={styles.truckItem}>{truck.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyJjim;
