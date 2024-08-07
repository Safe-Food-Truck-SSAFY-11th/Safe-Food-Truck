import { useNavigate } from "react-router-dom";
import styles from "./OpenClose.module.css";
import useTruckStore from "store/users/owner/truckStore";

const OpenClose = ({ onLiveEndClick }) => {
  const { truckInfo, switchStatus, isLive, toggleLive } = useTruckStore();
  const navigate = useNavigate();

  const handleOpenClick = () => {
    navigate("/permitAreaCheck");
  };

  const handleLiveStartClick = () => {
    toggleLive();
    const storeId = truckInfo.storeId;
    navigate("/live/" + storeId);
  };

  const handleLiveEndClick = () => {
    //세션 종료하는 함수
    onLiveEndClick();
    toggleLive();
    navigate("/mainOwner");
  };

  // 푸드트럭 상태에 따른 버튼 변경
  const renderButtons = () => {
    switch (truckInfo.isOpen) {
      case true: // 영업중
        if (isLive) {
          return (
            <>
              <button
                className={styles.openButton}
                onClick={handleLiveEndClick}
              >
                <span
                  role="img"
                  aria-label="broadcastEnd"
                  className={styles.icon}
                >
                  📹
                </span>{" "}
                방송종료
              </button>
              <button className={styles.closeButton} onClick={switchStatus}>
                <span role="img" aria-label="close" className={styles.icon}>
                  🏢
                </span>{" "}
                영업종료
              </button>
            </>
          );
        } else {
          return (
            <>
              <button
                className={styles.openButton}
                onClick={handleLiveStartClick}
              >
                <span
                  role="img"
                  aria-label="broadcastStart"
                  className={styles.icon}
                >
                  📹
                </span>{" "}
                방송시작
              </button>
              <button className={styles.closeButton} onClick={switchStatus}>
                <span role="img" aria-label="close" className={styles.icon}>
                  🏢
                </span>{" "}
                영업종료
              </button>
            </>
          );
        }
      case false: // 영업 종료
        return (
          <>
            <button className={styles.openButton} onClick={handleOpenClick}>
              <span role="img" aria-label="open" className={styles.icon}>
                🏢
              </span>{" "}
              영업시작
            </button>
            <button className={styles.closeButton} disabled>
              <span role="img" aria-label="close" className={styles.icon}>
                🏢
              </span>{" "}
              영업종료
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return <div className={styles.openCloseContainer}>{renderButtons()}</div>;
};

export default OpenClose;
