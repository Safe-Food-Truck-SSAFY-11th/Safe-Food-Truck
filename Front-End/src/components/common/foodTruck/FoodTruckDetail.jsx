import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFoodTruckStore from "../../../store/trucks/useFoodTruckStore";
import FoodTruckMenuList from "./FoodTruckMenuList";
import FoodTruckInfo from "./FoodTruckInfo";
import ReviewList from "./ReviewList";
import FoodTruckSummary from "./FoodTruckSummary";
import styles from "./FoodTruckDetail.module.css";
import NoLiveModal from "./NoLiveModal";
import useLiveStore from "store/live/useLiveStore";
import customerOrderStore from "store/orders/customerOrderStore";

function FoodTruckDetail() {
  //모달창
  const { isModalOpen } = useLiveStore();

  // Params 사용해서 storeId 가져옴
  const { storeId } = useParams();

  // 만난적 있는 푸드트럭인지 체크하기 위해 스토어에서 과거 주문 목록 가져옴
  const { pastOrders } = customerOrderStore();

  // isMeet 변수를 상태로 관리
  const [isMeet, setIsMeet] = useState(false);
  
  // 컴포넌트 상태 변경을 위한 state사용 기본값 menu
  const [view, setView] = useState('menu'); 

  const { 
    // 푸드트럭 디테일 가져옴
    getFoodTruck, 
    selectedTruck,
    
    // 해당 푸드트럭의 총 메뉴 가져옴
    getFoodTruckMenus, 
    selectedTruckMenus, 
    
    // 해당 푸드트럭의 총 리뷰 가져옴
    getFoodTruckReviews, 
    selectedTruckReviews, 

    getFoodTruckSchedule,
    selectedTruckSchedule,
  } = useFoodTruckStore((state) => state);

  useEffect(() => {
    // 푸드트럭 기본 정보 가져오기
    getFoodTruck(storeId);

    // 푸드트럭 메뉴들 가져오기
    getFoodTruckMenus(storeId);

    // 푸드트럭에 달린 리뷰 가져오기
    getFoodTruckReviews(storeId);

    // 푸드트럭 스케줄 가져오기
    getFoodTruckSchedule(storeId);

    // 과거 주문 목록에서 현재 storeId와 일치하는 트럭이 있는지 확인
    if (pastOrders?.customerOrderResponseDtos) {
      const meet = pastOrders.customerOrderResponseDtos.some(order => order.storeId === Number(storeId));
      if (meet) {
        setIsMeet(true);
      }
    }
  }, [storeId, pastOrders, getFoodTruck, getFoodTruckMenus, getFoodTruckReviews, getFoodTruckSchedule]);

  // FoodTruckMenuList , ReviewList 컴포넌트로 props로 전달 할 메뉴리스트와 리뷰리스트
  const menus = selectedTruckMenus?.menuResponseDtos || [];
  const reviews = selectedTruckReviews?.reviewList || [];

  // 안 불러와졌으면 로딩 상태 추가
  if (!selectedTruck) {
    return <div>푸드트럭 가져오는 중이에요...</div>;
  }

  return (
    <div className={styles.foodTruckDetail}>
      <FoodTruckSummary truck={selectedTruck} />

      <div className={styles.nav}>
        <button
          onClick={() => setView("menu")}
          className={view === "menu" ? styles.selected : ""}
        >
          메뉴
        </button>
        <button
          onClick={() => setView("info")}
          className={view === "info" ? styles.selected : ""}
        >
          정보
        </button>
        <button
          onClick={() => setView("reviews")}
          className={view === "reviews" ? styles.selected : ""}
        >
          리뷰
        </button>
      </div>

      <div className={styles.content}>
        {view === 'menu' && <FoodTruckMenuList menus={menus} storeId={storeId} />}
        {view === 'info' && <FoodTruckInfo truck={selectedTruck} reviews={reviews} isMeet={isMeet} selectedTruckSchedule={selectedTruckSchedule} />}
        {view === 'reviews' && <ReviewList reviews={reviews}/>}
      </div>

      {isModalOpen && <NoLiveModal />}
    </div>
  );
}

export default FoodTruckDetail;
