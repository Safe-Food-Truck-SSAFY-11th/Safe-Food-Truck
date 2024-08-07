import styles from "./MakeLogo.module.css";
import alertImg from "assets/images/alert.png";
import { useState } from "react";
import axiosInstance from 'utils/axiosInstance';  

const MakeLogo = ({ closeMakeLog, storeName, storeType }) => {
  const [aiImageURL, setAIImageURL] = useState("");
  const param = {
    storeName:"Delicious Chicken Stick",
    storeType:"chicken stick",
    "logoStyle":"bright"
}
  const getImage = async () => {
    const response = await axiosInstance.post(`/logos`, param);
    console.log(response.data);
    setAIImageURL(response.data);
    return response.data;
  }

  return (
    <div className={styles.makeLogoModal}>
      <div className={styles.modalContent}>
        <div className={styles.alretImg}>
          <img src={alertImg} alt="alert" />
        </div>
        <div>
          <p>허가되지 않은 구역이에요 😰</p>  
        </div>
        <div>
          <button className={styles.moveButton} onClick={getImage}>
            다시 생성
          </button>
          <button className={styles.moveButton} onClick={closeMakeLog}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeLogo;
