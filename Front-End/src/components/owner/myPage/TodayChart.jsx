import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const TodayChart = ({ weeklySales }) => {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
  const today = new Date().toISOString().split('T')[0];
  
  // 오늘 날짜와 일치하는 데이터를 찾기
  const todaySales = weeklySales.find(sale => sale.date === today);
  
  if (weeklySales.length === 0 || !todaySales) {
    return <div className={styles.container}>오늘의 판매 데이터가 없습니다.</div>;
  }
  
  // 메뉴 데이터를 count 기준으로 내림차순 정렬
  const sortedMenuDetails = todaySales.menuDetails.sort((a, b) => b.count - a.count);

  const todayData = {
    labels: sortedMenuDetails.map(menu => menu.menuName),
    datasets: [
      {
        label: "판매량",
        data: sortedMenuDetails.map(menu => menu.count),
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
      }
    ]
  };

  const totalSalesCount = todayData.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

  const options = {
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
      <div className={styles.chartSummary}>
        <p>
          오늘 매출은 <strong>{todaySales.totalAmount.toLocaleString()}</strong>원 이에요
        </p>
        <p>
          <strong>{totalSalesCount}</strong>개의 메뉴를 팔았어요
        </p>
      </div>
      <div className={styles.chartSummary}>
        <h3>오늘 팔린 메뉴</h3>
        <Pie data={todayData} options={options} />
      </div>
    </div>
  );
};

export default TodayChart;
