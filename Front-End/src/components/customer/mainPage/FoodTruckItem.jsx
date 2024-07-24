import React from 'react';
import styles from './FoodTruckItem.module.css';

function FoodTruckItem({ id , name, category, address, rating }) {


  return (
    <div className={styles.foodTruckItem}>
      <img src="/path/to/food-truck-icon.png" alt="Food Truck Icon" className={styles.icon} />
      <div className={styles.details}>
        <h3>{name} <span className={styles.rating}>★ {rating}</span></h3>
        <p className={styles.category}>{category}</p>
        <p className={styles.address}>{address}</p>
      </div>
    </div>
  );
}

export default FoodTruckItem;
