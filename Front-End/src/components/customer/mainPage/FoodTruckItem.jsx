import React from 'react';
import styles from './FoodTruckItem.module.css';

function FoodTruckItem({ name, address, distance, imageUrl, onClick }) {

  return (
    <div className={styles.foodTruckItem} onClick={onClick}>
      <img src={imageUrl} alt={`${name}의 이미지`} className={styles.icon} />
      <div className={styles.foodTruckInfo}>
        <div className={styles.description}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.address}>{address}</p>
        <p className={styles.distance}>{distance.toFixed(2)} km 만큼 떨어져 있어요!</p>
        </div>
      </div>
    </div>
  );
}

export default FoodTruckItem;
