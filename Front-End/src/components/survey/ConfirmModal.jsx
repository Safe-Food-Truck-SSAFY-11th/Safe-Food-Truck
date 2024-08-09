import styles from "./WarningModal.module.css";
import surveyImg from "assets/images/survey.png";

const ConfirmModal = ({ onConfirm }) => {
  return (
    <div className={styles.areaWarningModal}>
      <div className={styles.modalContent}>
        <div className={styles.alretImg}>
          <img src={surveyImg} alt="alert" className={styles.surveyImg} />
        </div>
        <div>
          <p>수요조사 완료! </p>
          <p>푸드트럭이 곧 찾아 올 거에요 😋</p>
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

export default ConfirmModal;
