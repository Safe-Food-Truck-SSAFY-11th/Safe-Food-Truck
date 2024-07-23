import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFoodTruckStore from '../../../store/trucks/useFoodTruckStore';
import FoodTruckMenuList from './FoodTruckMenuList';
import FoodTruckInfo from './FoodTruckInfo';
import ReviewList from './ReviewList';
import FoodTruckSummary from './FoodTruckSummary';
import styles from './FoodTruckDetail.module.css';

function FoodTruckDetail() {
  const { id } = useParams();
  const [view, setView] = useState('menu'); // 'menu', 'info', or 'reviews'
  const selectedTruck = useFoodTruckStore((state) => state.selectedTruck);
  const getFoodTruck = useFoodTruckStore((state) => state.getFoodTruck);

  useEffect(() => {
    getFoodTruck(id);
  }, [id, getFoodTruck]);

  if (!selectedTruck) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.foodTruckDetail}>
      <FoodTruckSummary 
        name={selectedTruck.name}
        description={selectedTruck.description}
        rating={selectedTruck.rating}
      />
      <div className={styles.nav}>
        <button onClick={() => setView('menu')} className={view === 'menu' ? styles.selected : ''}>메뉴</button>
        <button onClick={() => setView('info')} className={view === 'info' ? styles.selected : ''}>정보</button>
        <button onClick={() => setView('reviews')} className={view === 'reviews' ? styles.selected : ''}>리뷰</button>
      </div>
      <div className={styles.content}>
        {view === 'menu' && <FoodTruckMenuList />}
        {view === 'info' && <FoodTruckInfo />}
        {view === 'reviews' && <ReviewList />}
      </div>
    </div>
  );
}

export default FoodTruckDetail;
