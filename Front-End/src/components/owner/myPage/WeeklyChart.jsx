import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import styles from "./Chart.module.css";

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const WeeklyChart = () => {
  const weeklyPieData = {
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
        data: [45, 35, 25, 15, 5, 5, 5],
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

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const getLast7DaysLabels = () => {
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = dayNames[date.getDay()];
      labels.push(`${date.getMonth() + 1}/${date.getDate()} (${dayName})`);
    }
    return labels;
  };

  const weeklyLineData = {
    labels: getLast7DaysLabels(),
    datasets: [
      {
        label: "매출 (만원)",
        data: [10, 15, 5, 0, 5, 10, 8],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <p>
        주간 매출은 <strong>500,000</strong>원 이에요
      </p>
      <p>
        <strong>120</strong>개의 주문을 받았어요
      </p>
      <h3>이번주 팔린 메뉴</h3>
      <Pie data={weeklyPieData} />
      <h3>이번주 매출</h3>
      <Line data={weeklyLineData} />
    </div>
  );
};

export default WeeklyChart;
