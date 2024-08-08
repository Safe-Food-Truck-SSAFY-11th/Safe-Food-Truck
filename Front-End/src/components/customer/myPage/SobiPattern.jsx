import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './SobiPattern.module.css';

// Chart.js에서 필요한 컴포넌트 등록
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const SobiPatternPie = ({ memberInfo, mySobiPattern }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mySobiPattern) {
      // 데이터를 변환하여 chart.js에서 사용할 수 있도록 함
      const chartData = {
        labels: mySobiPattern.customerOrderByStoreSummaryDtos.map(store => store.storeName),
        datasets: [
          {
            label: '주간 주문 횟수',
            data: mySobiPattern.customerOrderByStoreSummaryDtos.map(store => store.orderCount),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          },
        ],
      };

      // storeType별로 가장 많이 주문한 항목을 찾음
      const mostEatenStoreType = mySobiPattern.customerOrderByStoreSummaryDtos.reduce((prev, current) => {
        return (prev.orderCount > current.orderCount) ? prev : current;
      }, { storeType: 'N/A', orderCount: 0 }).storeType;

      setData({
        
        totalSpent: mySobiPattern.weeklyTotalAmount,
        mostEaten: mostEatenStoreType,
        pattern: chartData,
      });
      setLoading(false);
    }
  }, [mySobiPattern]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.backgroundColor}>
      <div className={styles.container}>
        <h3>{memberInfo.nickname}님이 자주 만난 푸드트럭이에요!</h3>
        <p>이번주에 푸드트럭에 총 <strong>{data.totalSpent.toLocaleString()}원</strong> 썼어요!</p>
        <p>가장 많이 먹은 음식은 <strong>{data.mostEaten}</strong>입니다!</p>
        <div className={styles.chartContainer}>
          <Pie data={data.pattern} />
        </div>
      </div>
    </div>
  );
};

export default SobiPatternPie;
