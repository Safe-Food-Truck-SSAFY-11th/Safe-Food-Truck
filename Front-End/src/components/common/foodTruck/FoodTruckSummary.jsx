import React, { useEffect, useState } from "react";
import styles from "./FoodTruckSummary.module.css";
import axios from "axios";
import useLiveStore from "store/live/useLiveStore";
import { useNavigate, useParams } from "react-router-dom";
import NoLiveModal from "./NoLiveModal";
import useFoodTruckStore from "store/trucks/useFoodTruckStore";
import customerStore from "store/users/customer/customerStore";
import defaultImage from "assets/images/truck-img.png"; // 여기에 디폴트 이미지 경로를 임포트하세요

function FoodTruckSummary({ truck }) {
  const { isModalOpen, openModal } = useLiveStore();
  const navigate = useNavigate();
  const { storeId } = useParams();

  const APPLICATION_SERVER_URL = "https://i11b102.p.ssafy.io/";

  const isLive = async (sessionId) => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + "api/sessions/" + sessionId,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 204) {
        openModal();
      } else {
        const token = response.data;
        navigate(`/live/${sessionId}`);
        return response.data;
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

  useEffect(() => {
    const fetchJJimTruckStatus = async () => {
      try {
        const response = await getJJimTruck(storeId);
        const favoriteId = response.favoriteId;
        setFavId(favoriteId);
        console.log("Fetched favoriteId:", favoriteId);

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

    fetchJJimTruckStatus();
  }, [getJJimTruck, storeId]);

  const handleJJimClick = async () => {
    try {
      if (checkJJimTruck) {
        await unJJimTruck(favId);
        setCheckJJimTruck(false);
      } else {
        await JJimTruck(storeId);
        setCheckJJimTruck(true);
      }
      // 버튼 클릭 후 새로고침
      window.location.reload();
    } catch (error) {
      console.error("Error handling JJim action:", error);
    }
  };

  return (
    <header className={styles.header}>
      <img
        src={truck.storeImageDto?.savedUrl === 'empty' ? defaultImage : truck.storeImageDto.savedUrl}
        alt={`${truck.name} 이미지`}
        className={styles.truckImage}
      />
      <div className={styles.textContainer}>
        <h1>
          {truck.name} ★ {truck.averageStar / 2}
        </h1>
        <h1>{truck.description}</h1>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleJJimClick}
            className={styles.jjimButton} /* 찜 버튼에 클래스명 추가 */
          >
            {checkJJimTruck ? "찜" : "찜"}
          </button>
          <button
            className={styles.liveButton}
            onClick={handleLiveClick}
          >
            LIVE
          </button>
        </div>
      </div>

      {isModalOpen && <NoLiveModal />}
    </header>
  );
}

export default FoodTruckSummary;
