import React, { useState } from 'react';
import BroadCastList from "./BroadCastList";
import FoodFilter from "./FoodFilter";
import MapCustomer from "./MapCustomer";
import FoodTruckList from "./FoodTruckList";

function MainCustomer() {
  const [view, setView] = useState('map'); // 'map' or 'list'
  const [selectedType, setSelectedType] = useState('all'); // 선택된 타입 상태

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      <h1>손님 메인페이지 입니다.</h1>
      <BroadCastList />
      <h3>용훈님!🖐 오늘 푸드트럭 어때요?</h3>
      <FoodFilter selectedType={selectedType} onSelectType={handleSelectType} />

      <div className="view-switcher">
        <button onClick={() => setView('map')} className={view === 'map' ? 'selected' : ''}>푸드트럭 지도</button>
        <button onClick={() => setView('list')} className={view === 'list' ? 'selected' : ''}>푸드트럭 목록</button>
      </div>

      {view === 'map' ? <MapCustomer selectedType={selectedType} /> : <FoodTruckList selectedType={selectedType} />}
    </>
  );
}

export default MainCustomer;
