import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OwnerInfo.module.css";
import userStore from "store/users/userStore";
import useTruckStore from "store/users/owner/truckStore";
import useFoodTruckStore from "store/trucks/useFoodTruckStore";
import profile_img from "assets/images/profile_image.png"
import ManageStore from "./ManageStore";

const OwnerInfo = () => {
  const navigate = useNavigate();
  const { fetchUser } = userStore();
  const { truckInfo, fetchTruckInfo } = useTruckStore();
  const { likes, getFoodTruckLikes } = useFoodTruckStore();
  const [showManageModal, setShowManageModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const imageUrl = userInfo?.memberImage?.savedUrl === 'empty' ? profile_img : userInfo?.memberImage?.savedUrl;

  useEffect(() => {
    const fetchTruckData = async () => {
      await fetchTruckInfo();
    };
    fetchTruckData();
  }, [fetchTruckInfo]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (truckInfo.storeId) {
        await getFoodTruckLikes(truckInfo.storeId);
      }
    };
    fetchLikes();
  }, [truckInfo.storeId, getFoodTruckLikes]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await fetchUser();
      setUserInfo(data);
    };
    fetchUserData();
  }, [fetchUser, userInfo]);

  const handleUpdateClick = () => {
    navigate("/ownerUpdate");
  };

  const handleTruckReviewClick = () => {
    navigate("/ownerReview");
  };

  const handleTruckUpdateClick = () => {
    setShowManageModal(true);
  };
  const modalClose = () => {
    setShowManageModal(false);
  };

  const handleMenuManageClick = () => {
    navigate("/manageMenu");
  };

  // 데이터
  const ownerName = sessionStorage.getItem("nickname");
  const truckName = truckInfo?.name;
  const weeklyIncome = truckInfo?.offDay;

  // 근무 요일 변환
  const getDayString = (income) => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    return income
      .split("")
      .map((char, index) => (char === "1" ? days[index] : null))
      .filter((day) => day)
      .join(" ");
  };

  const formattedIncome = weeklyIncome ? getDayString(weeklyIncome) : "";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.imageContainer}>
            <img src={imageUrl} alt="Truck Owner" className={styles.image} />
          </div>
          <div className={styles.info}>
            <div className={styles.infoContent}>
              <p className={styles.infoText}>
                반갑습니다 <span className={styles.highlight}>{ownerName}</span>{" "}
                사장님!
              </p>
              <p className={styles.infoText}>
                <span className={styles.highlight}>{truckName}</span> 트럭을 찜❤️한
                손님 : <span className={styles.highlight}>{likes?.favoriteCount || 0}</span> 명
              </p>
              <p className={styles.infoText}>
                <span className={styles.highlight}>{formattedIncome}</span>요일에 열어요
              </p>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={`${styles.profileButton} ${styles.button}`} onClick={handleUpdateClick}>
            내 정보 수정
          </button>
          <button className={styles.button} onClick={handleTruckReviewClick}>리뷰 보기</button>
          <button className={styles.button} onClick={handleTruckUpdateClick}>
            트럭 관리
          </button>
          <button className={styles.button} onClick={handleMenuManageClick}>
            메뉴 관리
          </button>
        </div>
      </div>
      {showManageModal && <ManageStore modalClose={modalClose} />}
    </>
  );
};

export default OwnerInfo;
