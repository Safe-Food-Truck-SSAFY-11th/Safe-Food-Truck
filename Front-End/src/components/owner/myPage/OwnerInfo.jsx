import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OwnerInfo.module.css";
import logo from "assets/images/sft-logo.png";
import useTruckStore from "store/users/owner/truckStore";
import useFoodTruckStore from "store/trucks/useFoodTruckStore";

const OwnerInfo = () => {
  const navigate = useNavigate();
  const { truckInfo, fetchTruckInfo } = useTruckStore();
  const { getFoodTruckLikes } = useFoodTruckStore();

  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTruckInfo();
      const likes = await getFoodTruckLikes(truckInfo.storeId);
      setLikesCount(likes);
    };

    fetchData();
  }, [fetchTruckInfo, getFoodTruckLikes, truckInfo.storeId]);

  const handleUpdateClick = () => {
    navigate("/ownerUpdate");
  };

  const handleTruckReviewClick = () => {
    navigate("/ownerReview");
  }

  const handleTruckUpdateClick = () => {
    navigate("/manageTruck");
  };

  const handleMenuManageClick = () => {
    navigate("/manageMenu");
  };

  // 데이터
  const ownerName = sessionStorage.getItem("nickname");
  const truckName = truckInfo.name;
  const weeklyIncome = truckInfo.offDay;

  // 근무 요일 변환
  const getDayString = (income) => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    return income
      .split("")
      .map((char, index) => (char === "1" ? days[index] : null))
      .filter((day) => day)
      .join(" ");
  };

  const formattedIncome = getDayString(weeklyIncome);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src={logo} alt="Truck Owner" className={styles.image} />
          <button className={styles.profileButton} onClick={handleUpdateClick}>
            내 정보 수정
          </button>
        </div>
        <div className={styles.info}>
          <p>
            반갑습니다 <span className={styles.highlight}>{ownerName}</span>{" "}
            사장님!
          </p>
          <p className={styles.infoText}>
            <span className={styles.highlight}>{truckName}</span> 트럭을 찜❤️한
            손님 : <span className={styles.highlight}>{likesCount}</span> 명
          </p>
          <p className={styles.infoText}>
            <span className={styles.highlight}>{formattedIncome}</span>요일에 열어요
          </p>

          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleTruckReviewClick}>트럭 리뷰 보기</button>
            <button className={styles.button} onClick={handleTruckUpdateClick}>
              트럭 정보 수정
            </button>
            <button className={styles.button} onClick={handleMenuManageClick}>
              판매 메뉴 관리
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerInfo;
