import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import styles from "./Chart.module.css";

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const WeeklyChart = ({ weeklySales }) => {
  if (weeklySales.length === 0) {
    return <div className={styles.container}>주간 판매 데이터가 없습니다.</div>;
  }

  // 모든 메뉴 이름을 수집하고, count 기준으로 내림차순 정렬
  const allMenuDetails = weeklySales.flatMap(day => day.menuDetails);
  const menuCounts = allMenuDetails.reduce((acc, { menuName, count }) => {
    if (!acc[menuName]) {
      acc[menuName] = 0;
    }
    acc[menuName] += count;
    return acc;
  }, {});

  const sortedMenuNames = Object.keys(menuCounts).sort((a, b) => menuCounts[b] - menuCounts[a]);

  const weeklyPieData = {
    labels: sortedMenuNames,
    datasets: [
      {
        label: "판매량",
        data: sortedMenuNames.map(name => menuCounts[name]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 230, 86, 0.6)",
          "rgba(255, 190, 70, 0.6)",
          "rgba(120, 200, 150, 0.6)",
          "rgba(100, 100, 255, 0.6)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 230, 86, 1)",
          "rgba(255, 190, 70, 1)",
          "rgba(120, 200, 150, 1)",
          "rgba(100, 100, 255, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const getLast7Days = () => {
    const days = [];
    for (let i = 0; i <= 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = dayNames[date.getDay()];
      days.push({ date: `${date.getMonth() + 1}/${date.getDate()}`, dayName });
    }
    return days.reverse();
  };

  const last7Days = getLast7Days();

  const weeklyLineData = {
    labels: last7Days.map(day => `${day.date} (${day.dayName})`),
    datasets: [
      {
        label: "매출 (만원)",
        data: last7Days.map(day => {
          const salesData = weeklySales.find(sale => {
            const saleDate = new Date(sale.date);
            return `${saleDate.getMonth() + 1}/${saleDate.getDate()}` === day.date;
          });
          return salesData ? salesData.totalAmount / 10000 : 0;
        }),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const totalWeeklySales = weeklySales.reduce((acc, day) => acc + day.totalAmount, 0);
  const totalOrders = weeklySales.reduce((acc, day) => acc + day.menuDetails.reduce((sum, menu) => sum + menu.count, 0), 0);

  const pieChartOptions = {
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);

                return {
                  text: `${label} (${data.datasets[0].data[i]})`,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: !chart.getDataVisibility(i),
                  index: i
                };
              });
            }
            return [];
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <p>
        주간 매출은 <strong>{totalWeeklySales}</strong>원 이에요
      </p>
      <p>
        <strong>{totalOrders}</strong>개의 주문을 받았어요
      </p>
      <h3>이번주 팔린 메뉴</h3>
      <Pie data={weeklyPieData} options={pieChartOptions} />
      <h3>이번주 매출</h3>
      <Line data={weeklyLineData} />
    </div>
  );
};

export default WeeklyChart;
