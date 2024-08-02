import React from 'react';
import styles from './FoodTruckMenuItem.module.css';

function FoodTruckMenuItem({ item }) {
  return (
    <div className={styles.menuItem}>
      {item.image && <img src={item.image} alt={item.name} className={styles.image} />}
      <div className={styles.details}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{item.price}원</p>
      </div>
    </div>
  );
}

export default FoodTruckMenuItem;
