import { useNavigate } from "react-router-dom";
import styles from "./SurveyArea.module.css";

const SurveyArea = () => {
  const navigate = useNavigate();

  const goSurvey = () => {
    navigate("/survey");
  };

  return (
    <div className={styles.surveyArea}>
      <div className={styles.title}>원하는 푸드트럭이 없으신가요?</div>
      <div className={styles.surveyBtn}>
        <button onClick={goSurvey}>수요조사 하러가기 🍕</button>
      </div>
    </div>
  );
};

export default SurveyArea;
