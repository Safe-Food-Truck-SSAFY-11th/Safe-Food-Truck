import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const TodayChart = () => {
  const todayData = {
    labels: [
      "슈크림 붕어빵",
      "피자 붕어빵",
      "치즈 붕어빵",
      "팥 붕어빵",
      "민트 붕어빵",
      "초코 붕어빵",
      "와사비 붕어빵",
    ],
    datasets: [
      {
        label: "판매량",
        data: [10, 7, 5, 4, 1, 1, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <p>
        오늘의 매출은 <strong>100,000</strong>원 이에요
      </p>
      <p>
        <strong>25</strong>개의 주문을 받았어요
      </p>
      <h3>오늘 팔린 메뉴</h3>
      <Pie data={todayData} />
    </div>
  );
};

export default TodayChart;
