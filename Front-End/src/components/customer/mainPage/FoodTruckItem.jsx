import React from 'react';
import styles from './FoodTruckItem.module.css';

function FoodTruckItem({ name, address , distance , onClick}) {

  distance = parseFloat(distance).toFixed(1);

  return (
    <div className={styles.foodTruckItem} onClick={onClick}>
      <img src="/path/to/food-truck-icon.png" alt="Food Truck Icon" className={styles.icon} />
      <div className={styles.details}>
        <h3>{name} </h3>
        {/* <p className={styles.category}>{category}</p> */}
        <p className={styles.address}>현위치 : {address}</p>
        <p className={styles.distance}>{distance}km 만큼 멀리 있어요!</p>
      </div>
    </div>
  );
}

export default FoodTruckItem;
