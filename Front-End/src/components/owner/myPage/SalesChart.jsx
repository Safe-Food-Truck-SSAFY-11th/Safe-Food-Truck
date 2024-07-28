import React from "react";
import useTruckStore from "../../../store/users/owner/truckStore";
import TodayChart from "./TodayChart";
import WeeklyChart from "./WeeklyChart";
import styles from "./SalesChart.module.css";

const SalesChart = () => {
  const { activeTab, setActiveTab } = useTruckStore();

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return <TodayChart />;
      case "weekly":
        return <WeeklyChart />;
      case "average":
        return <p>주간 평균 데이터가 여기에 표시됩니다.</p>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => setActiveTab("today")}
          className={`${styles.button} ${
            activeTab === "today" ? styles.activeButton : ""
          }`}
        >
          오늘의 매출
        </button>
        <button
          onClick={() => setActiveTab("weekly")}
          className={`${styles.button} ${
            activeTab === "weekly" ? styles.activeButton : ""
          }`}
        >
          주간 매출
        </button>
        <button
          onClick={() => setActiveTab("average")}
          className={`${styles.button} ${
            activeTab === "average" ? styles.activeButton : ""
          }`}
        >
          주간 평균
        </button>
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default SalesChart;
