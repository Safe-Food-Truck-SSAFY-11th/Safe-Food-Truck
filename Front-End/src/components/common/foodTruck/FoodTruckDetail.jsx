import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFoodTruckStore from '../../../store/trucks/useFoodTruckStore';
import FoodTruckMenuList from './FoodTruckMenuList';
import FoodTruckInfo from './FoodTruckInfo';
import ReviewList from './ReviewList';
import FoodTruckSummary from './FoodTruckSummary';
import styles from './FoodTruckDetail.module.css';

function FoodTruckDetail() {
  // Params 사용해서 storeId 가져오고 라우팅
  const { storeId } = useParams();

  // 컴포넌트 상태 변경을 위한 state사용 기본값 menu
  const [view, setView] = useState('menu'); 

  // api 요청을 통해 가져온 디테일 푸드트럭 변수 선언
  const selectedTruck = useFoodTruckStore((state) => state.selectedTruck);

  // 선택된 트럭의 메뉴들을 가져온 변수 선언
  const selectedTruckMenus = useFoodTruckStore((state) => state.selectedTruckMenus);

  const getFoodTruck = useFoodTruckStore((state) => state.getFoodTruck);

  const getFoodTruckMenus = useFoodTruckStore((state) => state.getFoodTruckMenus);

  useEffect(() => {
    // 푸드트럭 기본 정보 가져오기
    getFoodTruck(storeId);

    // 푸드트럭 메뉴들 가져오기
    getFoodTruckMenus(storeId);

    // 푸드트럭에 달린 리뷰 가져오기 함수 추가 예정!

  }, []);

  // FoodTruckMenuList 컴포넌트로 props로 전달 할 배열
  const menus = selectedTruckMenus.menuResponseDtos

  // 안 불러와졌으면 로딩 상태 추가
  if (!selectedTruck) {
    return <div>푸드트럭 가져오는 중이에용</div>;
  }

  // 선택된 트럭 체크
  console.log(selectedTruck)

  return (
    <div className={styles.foodTruckDetail}>

      <FoodTruckSummary truck={selectedTruck} />

      <div className={styles.nav}>
        <button onClick={() => setView('menu')} className={view === 'menu' ? styles.selected : ''}>메뉴</button>
        <button onClick={() => setView('info')} className={view === 'info' ? styles.selected : ''}>정보</button>
        <button onClick={() => setView('reviews')} className={view === 'reviews' ? styles.selected : ''}>리뷰</button>
      </div>
      
      <div className={styles.content}>
        {view === 'menu' && <FoodTruckMenuList menus={menus} />}
        {view === 'info' && <FoodTruckInfo truck={selectedTruck} />}
        {view === 'reviews' && <ReviewList />}
      </div>
    </div>
  );
}

export default FoodTruckDetail;
