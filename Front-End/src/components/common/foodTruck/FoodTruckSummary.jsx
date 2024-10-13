import React, { useEffect, useState } from "react";
import styles from "./FoodTruckSummary.module.css";
import axios from "axios";
import useLiveStore from "store/live/useLiveStore";
import { useNavigate, useParams } from "react-router-dom";
import useFoodTruckStore from "store/trucks/useFoodTruckStore";
import customerStore from "store/users/customer/customerStore";
import defaultImage from "assets/images/truck-img.png"; 

function FoodTruckSummary({ truck }) {
  const { isModalOpen, openModal, fetchIsLive } = useLiveStore();
  const navigate = useNavigate();
  const { storeId } = useParams();

  const APPLICATION_SERVER_URL = "https://i11b102.p.ssafy.io/";

  const isLive = async (sessionId) => {
    try {
      const isLiveFlag = await fetchIsLive(sessionId);
      if (!isLiveFlag) {
        openModal();
      } else {
        navigate(`/live/${sessionId}`);
      }
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  };

  const handleLiveClick = () => {
    isLive(truck.storeId);
  };

  const [checkJJimTruck, setCheckJJimTruck] = useState(null);
  const [favId, setFavId] = useState(null);
  const { getJJimTruck } = customerStore();
  const { JJimTruck, unJJimTruck } = useFoodTruckStore();

  const fetchJJimTruckStatus = async () => {
    try {
      const response = await getJJimTruck(storeId);
      const favoriteId = response.favoriteId;
      setFavId(favoriteId);
      console.log("Fetched favoriteId:", response);

      if (favoriteId !== -1) {
        setCheckJJimTruck(true);
      } else {
        setCheckJJimTruck(false);
      }
    } catch (error) {
      console.error("Error fetching favoriteId:", error);
      setCheckJJimTruck(false);
    }
  };

  useEffect(() => {
    fetchJJimTruckStatus();
  }, []);

  const handleJJimClick = async () => {
    try {
      if (checkJJimTruck) {
        await unJJimTruck(favId);
      } else {
        await JJimTruck(storeId);
      }
      await fetchJJimTruckStatus();
    } catch (error) {
      console.error("Error handling JJim action:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img
        src={truck.storeImageDto?.savedUrl !== 'empty' && " " ? truck.storeImageDto.savedUrl : defaultImage }
          alt={`${truck.name} 이미지`}
          className={styles.truckImage}
        />
      <div className={styles.textContainer}>
        <h1 className={styles.truckName}>
          {truck.name} ⭐ {truck.averageStar / 2}
        </h1>
        <p className={styles.description}>{truck.description}</p>
        <div className={styles.buttonContainer}>
          {checkJJimTruck ? (
          <button
            onClick={handleJJimClick}
            className={styles.jjimButtonInActive} // checkJJim이 true일 때 적용할 스타일 클래스
          >
            찜 삭제
          </button>
        ) : (
          <button
            onClick={handleJJimClick}
            className={styles.jjimButtonActive} // checkJJim이 false일 때 적용할 스타일 클래스
          >
            찜 하기
          </button>
        )}
          <button
            className={styles.liveButton}
            onClick={handleLiveClick}
          >
            LIVE
          </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default FoodTruckSummary;
