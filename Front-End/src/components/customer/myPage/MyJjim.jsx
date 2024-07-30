import React from 'react';
import styles from './MyJjim.module.css';

const MyJjim = () => {
  const likedFoodTrucks = [
    { id: 1, name: '푸드트럭 1' },
    { id: 2, name: '푸드트럭 2' },
    { id: 3, name: '푸드트럭 3' },
  ];

  return (
    <div className={styles.container}>
      <h3>용훈😊 님이 찜한 푸드트럭 목록이에요!</h3>
      <ul>
        {likedFoodTrucks.map(truck => (
          <li key={truck.id} className={styles.truckItem}>{truck.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyJjim;
