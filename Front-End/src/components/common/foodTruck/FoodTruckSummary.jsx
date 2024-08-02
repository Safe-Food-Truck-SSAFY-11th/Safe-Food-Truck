import React from 'react';
import styles from './FoodTruckSummary.module.css';

function FoodTruckSummary({ truck }) {
  console.log(truck.data)
  // console.log(truck.data.name)
  // console.log(truck.data.description)
  return (
    <header className={styles.header}>
      <h1>{truck.name}</h1>
      <p>{truck.description}</p>
      <p>★ {truck.rating}</p>
    </header>
  );
}

export default FoodTruckSummary;
