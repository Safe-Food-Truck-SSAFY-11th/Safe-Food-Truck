import React, { useState, useEffect } from 'react';
import BroadCastList from "./BroadCastList";
import FoodFilter from "./FoodFilter";
import MapCustomer from "./MapCustomer";
import FoodTruckList from "./FoodTruckList";
import Header from '../../common/Header';
import styles from './MainCustomer.module.css';
import useFoodTruckStore from 'store/trucks/useFoodTruckStore';

function MainCustomer() {
  const [view, setView] = useState('map'); // 'map' or 'list'
  const [selectedType, setSelectedType] = useState('all'); // 선택된 타입 상태

  const { openFoodTrucks, getOpenFoodTruck } = useFoodTruckStore();
  const nickname = sessionStorage.getItem('nickname');

  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching user location:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }

    getOpenFoodTruck();
  }, []);

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      <Header />
      <BroadCastList />
      <hr />
      <h3 className={styles.h3}>{nickname}님!🖐 오늘 푸드트럭 어때요?</h3>
      <FoodFilter selectedType={selectedType} onSelectType={handleSelectType} />

      <div className={styles.buttons}>
        <button
          onClick={() => setView('map')}
          className={`${styles.button} ${view === 'map' ? styles.selected : ''}`}
        >
          푸드트럭 지도
        </button>
        <button
          onClick={() => setView('list')}
          className={`${styles.button} ${view === 'list' ? styles.selected : ''}`}
        >
          푸드트럭 목록
        </button>
      </div>

      {loading ? (
        <p>Loading...</p> // 로딩 상태를 표시합니다.
      ) : (
        view === 'map' ? (
          <MapCustomer openFoodTrucks={openFoodTrucks} userLocation={userLocation} />
        ) : (
          <FoodTruckList openFoodTrucks={openFoodTrucks} userLocation={userLocation} />
        )
      )}
    </>
  );
}

export default MainCustomer;
