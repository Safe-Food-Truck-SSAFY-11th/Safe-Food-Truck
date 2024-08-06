import React from "react";
import styles from "./FoodTruckSummary.module.css";
import axios from "axios";
import useLiveStore from "store/live/useLiveStore";
import { useParams, useNavigate } from "react-router-dom";
import NoLiveModal from "./NoLiveModal";

function FoodTruckSummary({ truck }) {
  console.log(truck.data);
  // console.log(truck.data.name)
  // console.log(truck.data.description)

  const { storeId } = useParams();
  const { isModalOpen, openModal, closeModal } = useLiveStore();
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
        //모달 띄우기
        openModal();
      } else {
        //라이브 페이지로 이동
        const token = response.data; // The token
        navigate(`/live/${sessionId}`, { state: { token: token } }); // token을 함께 전달
        return response.data; // The token
      }
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  };

  //라이브 방송보기 버튼 클릭
  const handleLiveClick = () => {
    isLive(storeId);
  };

  return (
    <header className={styles.header}>
      <div>
        <h1>{truck.name}</h1>
        <p>{truck.description}</p>
        <p>★ {truck.rating}</p>
      </div>
      <div>
        <button onClick={handleLiveClick}>LIVE 방송보기</button>
      </div>

      {isModalOpen && <NoLiveModal />}
    </header>
  );
}

export default FoodTruckSummary;
