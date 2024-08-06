import React from 'react';
import styles from './FoodTruckSummary.module.css';
import useFoodTruckStore from 'store/trucks/useFoodTruckStore';

function FoodTruckSummary({ truck }) {
  const { JJimTruck } = useFoodTruckStore();

  const handleJJimTruck = async () => {
    try {
      await JJimTruck(truck.storeId);
      alert(`${truck.name} 트럭이 찜 목록에 추가되었습니다!`);
    } catch (error) {
      console.error('찜 등록 실패', error);
      alert('찜 등록에 실패했습니다.');
    }
  };

  return (
    <header className={styles.header}>
      <h1>{truck.name}</h1>
      <p>{truck.description}</p>
      <p>★ {truck.rating}</p>
      <button className={styles.jjimButton} onClick={handleJJimTruck}>
        찜하기
      </button>
    </header>
  );
}

export default FoodTruckSummary;
