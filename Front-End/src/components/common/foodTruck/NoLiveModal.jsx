import useLiveStore from "store/live/useLiveStore";
import styles from "./NoLiveModal.module.css";
import alertImg from "assets/images/alert.png";

const NoLiveModal = () => {
  const { isModalOpen, openModal, closeModal } = useLiveStore();

  //모달 - 이동할게요 버튼 누르면
  const handleMoveButtonClick = () => {
    closeModal(); // 모달 닫기
    window.location.reload(); // 현재 페이지 새로고침
  };

  return (
    <div className={styles.areaWarningModal}>
      <div className={styles.modalContent}>
        <div className={styles.alretImg}>
          <img src={alertImg} alt="alert" />
        </div>
        <div>
          <p>현재 방송 중이 아니에요. 😰</p>
        </div>
        <div>
          <button className={styles.moveButton} onClick={handleMoveButtonClick}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoLiveModal;
