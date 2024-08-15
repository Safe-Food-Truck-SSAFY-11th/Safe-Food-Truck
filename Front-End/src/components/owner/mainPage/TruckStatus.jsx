import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TruckStatus.module.css";
import useTruckStore from "store/users/owner/truckStore";
import truck_img from "assets/images/truck-img.png";

const TruckStatus = () => {
  const navigate = useNavigate();
  const { truckInfo } = useTruckStore();

  const imageUrl =
    truckInfo?.storeImageDto?.savedUrl === "empty"
      ? truck_img
      : truckInfo?.storeImageDto?.savedUrl;

  // 푸드트럭 상태에 따른 문구 변경
  const renderStatusComment = () => {
    if (truckInfo.isOpen) {
      return <span>영업 중 👍</span>;
    } else {
      return <span>영업 종료 😴</span>;
    }
  };

  // 오늘 날짜 가져오기
  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekDay = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${year}. ${month}. ${day} ${weekDay}요일`;
  };

  const formattedDate = getFormattedDate();

  const handleChatBtn = () => {
    navigate("/chating");
  };

  return (
    <div className={styles.truckStatus}>
      <div className={styles.truckStatusImage}>

        <img src={imageUrl} alt="Truck" className={styles.image} />
      </div>

      <div className={styles.statusText}>
        <p>
          <span className={styles.inputText}>{formattedDate}</span>{" "}
          </p>
        <p>
          <span className={styles.inputTextStoreName}>{truckInfo.name}</span>{" "}
          <p>{renderStatusComment()}</p>
        </p>
      </div>
    </div>
  );
};

export default TruckStatus;
