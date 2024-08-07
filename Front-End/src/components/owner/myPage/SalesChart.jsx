import { useState, useEffect } from "react";
import useTruckStore from "../../../store/users/owner/truckStore";
import TodayChart from "./TodayChart";
import WeeklyChart from "./WeeklyChart";
import SurveyView from "./SurveyView";
import styles from "./SalesChart.module.css";
import useChartStore from "store/users/owner/chartStore";

const SalesChart = () => {
  const { activeTab, setActiveTab } = useTruckStore();
  const [ weeklySales, setWeeklySales ] = useState([]);
  const { getWeeklySales } = useChartStore();

  useEffect(() => {
    const fetchSalesData = async () => {
      const salesData = await getWeeklySales();
      setWeeklySales(salesData);
    };
    fetchSalesData();
    console.log(weeklySales)
  }, [getWeeklySales]);

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return <TodayChart weeklySales={weeklySales}/>;
      case "weekly":
        return <WeeklyChart weeklySales={weeklySales}/>;
      case "survey":
        return <SurveyView />;
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
          onClick={() => setActiveTab("survey")}
          className={`${styles.button} ${
            activeTab === "survey" ? styles.activeButton : ""
          }`}
        >
          수요 확인
        </button>
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default SalesChart;
