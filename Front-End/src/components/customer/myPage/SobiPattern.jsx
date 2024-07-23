import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './SobiPattern.module.css';

// Chart.js에서 필요한 컴포넌트 등록
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const SobiPatternPie = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 더미 데이터를 사용하여 테스트합니다.
      const dummyData = {
        totalSpent: 12500,
        mostEaten: '붕어빵',
        pattern: {
          labels: ['맛있는 붕어빵', '한반대 닭꼬치', '유온 타코야끼', '맛있는 닭꼬치', '대박 떡볶이', '집에 가고싶다', '배고파요'],
          datasets: [
            {
              label: '이번주 소비 패턴',
              data: [10, 8, 6, 4, 2, 1, 1],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
      };

      // 로딩 시뮬레이션을 위해 타임아웃을 설정합니다.
      setTimeout(() => {
        setData(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.backgroundColor}>
      <div className={styles.container}>
        <h3>용훈님이 자주 만난 푸드트럭이에요! </h3>
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
