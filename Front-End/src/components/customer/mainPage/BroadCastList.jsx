import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import BroadCastItem from './BroadCastItem';
import styles from './BroadCastList.module.css';
import axiosInstance from 'utils/axiosInstance';
import useEventStore from "store/eventStore";

function BroadCastList() {
  const [items, setItems] = useState([]); // 초기 상태 설정
  const { ownerLiveStratFlag, setOwnerLiveStratFlag } = useEventStore();
  const { ownerLiveEndFlag, setOwnerLiveEndFlag } = useEventStore();

  useEffect(() => {
    if (ownerLiveStratFlag) {
      getLiveList();
      setOwnerLiveStratFlag(false);
    }
  }, [ownerLiveStratFlag]); // 빈 배열을 의존성으로 설정하여 처음 마운트될 때만 호출되도록 설정

  useEffect(() => {
    if (ownerLiveEndFlag) {
      getLiveList();
      setOwnerLiveEndFlag(false);
    }
  }, [ownerLiveEndFlag])
  console.log("items: ", items);
  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 3.5,
    slidesToScroll: 1
  };

  const getLiveList = async() => {
    try {
      const response = await axiosInstance.post("/sessions/get-live-list");
      setItems(response.data); // 상태를 업데이트
      console.log("방송 리스트: ", response.data);
    } catch (error) {
      console.error("방송 리스트를 가져오는 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index}>
              <BroadCastItem storeInfo={item.storeInfo} />
            </div>
          ))
        ) : (
          <div>Loading...</div>  // items가 없을 때 표시할 메시지 또는 컴포넌트
        )}
      </Slider>
    </div>
  );
}

export default BroadCastList;
