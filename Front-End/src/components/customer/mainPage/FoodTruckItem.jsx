import React from 'react';
import styles from './FoodTruckItem.module.css';

function FoodTruckItem({ name, address, distance, imageUrl, onClick , type}) {
  return (
    <div className={styles.foodTruckItem} onClick={onClick}>
      <img src={imageUrl} alt={`${name}의 이미지`} className={styles.icon} />
      <div className={styles.foodTruckInfo}>
        <h3 className={styles.name}>{name} 트럭은 '{type}' 을 팔아요!</h3>
        <p className={styles.address}>'{address}' 여기 있어요! </p>
        <p className={styles.distance}>{distance.toFixed(2)} km 만큼 떨어져 있어요!</p>
      </div>
    </div>
  );
}

export default FoodTruckItem;
