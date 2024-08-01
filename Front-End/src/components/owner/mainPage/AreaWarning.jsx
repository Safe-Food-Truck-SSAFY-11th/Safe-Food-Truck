import styles from "./AreaWarning.module.css";
import alertImg from "assets/images/alert.png";
import usePermitAreaStore from "store/trucks/usePermitAreaStore";

const AreaWarning = () => {
  const { closeWarning } = usePermitAreaStore();

  //모달 - 이동할게요 버튼 누르면
  const handleMoveButtonClick = () => {
    closeWarning(); // 모달 닫기
    window.location.reload(); // 현재 페이지 새로고침
  };

  return (
    <div className={styles.areaWarningModal}>
      <div className={styles.modalContent}>
        <div className={styles.alretImg}>
          <img src={alertImg} alt="alert" />
        </div>
        <div>
          <p>허가되지 않은 구역이에요 😰</p>
        </div>
        <div>
          <button className={styles.moveButton} onClick={handleMoveButtonClick}>
            이동할게요
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreaWarning;
