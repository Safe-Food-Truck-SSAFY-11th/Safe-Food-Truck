import React, { useState, useEffect } from "react";
import FoodFilter from "./FoodFilter";
import FoodTruckList from "./FoodTruckList";
import MapCustomer from "./MapCustomer";
import Header from "../../common/Header";
import useFoodTruckStore from "store/trucks/useFoodTruckStore";
import SurveyArea from "./SurveyArea";
import styles from "./MainCustomer.module.css";

function MainCustomer() {
  const [view, setView] = useState('map');
  const [selectedType, setSelectedType] = useState('all');

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
      <SurveyArea />
      <hr />
      <h3 className={styles.h3}>{nickname}님!🖐 오늘 푸드트럭 어때요?</h3>
      <FoodFilter selectedType={selectedType} onSelectType={handleSelectType} />

      <div className={styles.buttons}>
        <button
          onClick={() => setView("map")}
          className={`${styles.button} ${
            view === "map" ? styles.selected : ""
          }`}
        >
          푸드트럭 지도
        </button>
        <button
          onClick={() => setView("list")}
          className={`${styles.button} ${
            view === "list" ? styles.selected : ""
          }`}
        >
          푸드트럭 목록
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        view === 'map' ? (
          <MapCustomer openFoodTrucks={openFoodTrucks} userLocation={userLocation} selectedType={selectedType} />
        ) : (
          <FoodTruckList openFoodTrucks={openFoodTrucks} userLocation={userLocation} selectedType={selectedType} />
        )
      )}
    </>
  );
}

export default MainCustomer;
