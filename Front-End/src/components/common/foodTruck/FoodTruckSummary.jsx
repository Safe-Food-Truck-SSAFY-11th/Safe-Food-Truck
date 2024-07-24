import React from 'react';
import styles from './FoodTruckSummary.module.css';

function FoodTruckSummary({ name, description, rating }) {
  return (
    <header className={styles.header}>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>★ {rating}</p>
    </header>
  );
}

export default FoodTruckSummary;
