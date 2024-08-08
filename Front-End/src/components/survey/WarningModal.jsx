import styles from "./WarningModal.module.css";
import alertImg from "assets/images/alert.png";

const WarningModal = ({ onConfirm }) => {
  return (
    <div className={styles.areaWarningModal}>
      <div className={styles.modalContent}>
        <div className={styles.alretImg}>
          <img src={alertImg} alt="alert" />
        </div>
        <div>
          <p>수요조사는 계정당 하루 1회만 신청할 수 있습니다 😰</p>
        </div>
        <div>
          <button className={styles.moveButton} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
