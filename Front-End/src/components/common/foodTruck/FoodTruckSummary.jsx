import React, { useEffect, useState, useCallback } from "react";
import styles from "./FoodTruckSummary.module.css";
import axios from "axios";
import useLiveStore from "store/live/useLiveStore";
import { useNavigate } from "react-router-dom";
import NoLiveModal from "./NoLiveModal";
import useFoodTruckStore from "store/trucks/useFoodTruckStore";
import customerStore from "store/users/customer/customerStore";

function FoodTruckSummary({ truck }) {
  const { isModalOpen, openModal } = useLiveStore();
  const navigate = useNavigate();

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

  const { JJimTruck, unJJimTruck } = useFoodTruckStore();
  const { getJJimTruck, myJJimTruck } = customerStore();
  const [isJJimmed, setIsJJimmed] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkJJimTruck = useCallback(async () => {
    setLoading(true);
    await getJJimTruck();

    if (myJJimTruck && myJJimTruck.memberFavoriteList) {
      const favoriteTruck = myJJimTruck.memberFavoriteList.find(
        (favTruck) => favTruck.storeId === parseInt(truck.storeId, 10)
      );

      if (favoriteTruck) {
        setIsJJimmed(true);
        setFavoriteId(favoriteTruck.favoriteId);
      } else {
        setIsJJimmed(false);
        setFavoriteId(null);
      }
    }
    setLoading(false);
  }, [getJJimTruck, myJJimTruck, truck.storeId]);

  const handleJJimTruck = async () => {
    setIsJJimmed((prev) => !prev);
    try {
      if (isJJimmed) {
        await unJJimTruck(favoriteId);
        alert(`${truck.name} 트럭이 찜 목록에서 제거되었습니다.`);
      } else {
        await JJimTruck(truck.storeId);
        alert(`${truck.name} 트럭이 찜 목록에 추가되었습니다.`);
      }
      checkJJimTruck();
    } catch (error) {
      console.error("찜 등록/삭제 실패", error);
      alert("찜 등록/삭제에 실패했습니다.");
      setIsJJimmed((prev) => !prev);
    }
  };

  useEffect(() => {
    checkJJimTruck();
  }, [truck.storeId]);

  if (loading) {
    return <div>찜 여부 체크중이에요...</div>;
  }

  return (
    <header className={styles.header}>
      {truck.storeImageDto?.savedUrl && (
        <img
          src={truck.storeImageDto.savedUrl}
          alt={`${truck.name} 이미지`}
          className={styles.truckImage}
        />
      )}
      <div className={styles.textContainer}>
        <h1>
          {truck.name} ★ {truck.averageStar / 2}
        </h1>
        <h1>{truck.description}</h1>
        <div className={styles.buttonContainer}>
          <button
            className={isJJimmed ? styles.unJJimButton : styles.jjimButton}
            onClick={handleJJimTruck}
          >
            {isJJimmed ? "찜" : "찜"}
          </button>
          <button className={styles.liveButton} onClick={handleLiveClick}>
            LIVE
          </button>
        </div>
      </div>

      {isModalOpen && <NoLiveModal />}
    </header>
  );
}

export default FoodTruckSummary;
