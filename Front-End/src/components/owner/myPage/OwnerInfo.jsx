import { useNavigate } from "react-router-dom";
import styles from "./OwnerInfo.module.css";
import logo from "../../../assets/images/sft-logo.png";

const OwnerInfo = () => {
  const navigate = useNavigate();
  const handleUpdateClick = () => {
    navigate("/ownerUpdate");
  };
  const handleTruckUpdateClick = () => {
    navigate("/manageTruck");
  };

  // 더미 데이터
  const ownerName = "푸바오";
  const truckName = "울퉁불퉁";
  const likesCount = 1234;
  const weeklyIncome = "1010100"; // 월 수 금

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
          <button className={styles.profileButton} onClick={handleUpdateClick}>내 정보 수정</button>
        </div>
        <div className={styles.info}>
          <p>
            반갑습니다 <span className={styles.highlight}>{ownerName}</span>{" "}
            사장님!
          </p>
          <p>
            <span className={styles.highlight}>{truckName}</span> 트럭을 찜❤️한
            손님 : <span className={styles.highlight}>{likesCount}</span> 명
          </p>
          <p>
            <span className={styles.highlight}>{formattedIncome}</span>에 열어요
          </p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button}>내 트럭 보기</button>
        <button className={styles.button} onClick={handleTruckUpdateClick}>트럭 정보 수정</button>
      </div>
    </div>
  );
};

export default OwnerInfo;
