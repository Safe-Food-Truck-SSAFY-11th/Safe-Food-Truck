import React from 'react';
import styles from './BroadCastItem.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BroadCastItem({ storeInfo }) {
  console.log("이미지: ", storeInfo.storeImageDto.savedUrl);

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
      const token = response.data;
      navigate(`/live/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  };

  const handleLiveClick = () => {
    isLive(storeInfo.storeId);
  };

  return (
    <div>
      <div className={styles.broadcastItem} onClick={handleLiveClick}>
        <div className={styles.imageWrapper}>
          <div className={styles.imagePlaceholder}>
            <img src={storeInfo.storeImageDto.savedUrl} alt="store" />
          </div>
        </div>
        <a className={styles.liveListName}>{storeInfo.name}</a>
      </div>
    </div>
  );
}

export default BroadCastItem;
