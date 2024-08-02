import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFoodTruckStore from '../../../store/trucks/useFoodTruckStore';
import FoodTruckMenuList from './FoodTruckMenuList';
import FoodTruckInfo from './FoodTruckInfo';
import ReviewList from './ReviewList';
import FoodTruckSummary from './FoodTruckSummary';
import styles from './FoodTruckDetail.module.css';

function FoodTruckDetail() {
  const { storeId } = useParams();
  const [view, setView] = useState('menu'); // 'menu', 'info', or 'reviews'
  const selectedTruck = useFoodTruckStore((state) => state.selectedTruck);
  const selectedTruckMenus = useFoodTruckStore((state) => state.selectedTruckMenus);
  const getFoodTruck = useFoodTruckStore((state) => state.getFoodTruck);
  const getFoodTruckMenus = useFoodTruckStore((state) => state.getFoodTruckMenus);

  useEffect(() => {
    getFoodTruck(storeId);
    getFoodTruckMenus(storeId);
  }, [storeId, getFoodTruck, getFoodTruckMenus]);

  if (!selectedTruck) {
    return <div>Loading...</div>;
  }
  console.log(selectedTruck)
  return (
    <div className={styles.foodTruckDetail}>
      <FoodTruckSummary truck={selectedTruck} />
      <div className={styles.nav}>
        <button onClick={() => setView('menu')} className={view === 'menu' ? styles.selected : ''}>메뉴</button>
        <button onClick={() => setView('info')} className={view === 'info' ? styles.selected : ''}>정보</button>
        <button onClick={() => setView('reviews')} className={view === 'reviews' ? styles.selected : ''}>리뷰</button>
      </div>
      <div className={styles.content}>
        {view === 'menu' && <FoodTruckMenuList menus={selectedTruckMenus.menuResponseDtos} />}
        {view === 'info' && <FoodTruckInfo truck={selectedTruck} />}
        {view === 'reviews' && <ReviewList truck={selectedTruck} />}
      </div>
    </div>
  );
}

export default FoodTruckDetail;
