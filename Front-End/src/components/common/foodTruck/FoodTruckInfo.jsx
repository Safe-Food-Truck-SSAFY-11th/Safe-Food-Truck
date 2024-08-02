import React from 'react';

function FoodTruckInfo({ truck }) {
  return (
    <div>
      <h2>{truck.name}</h2>
      <p>{truck.description}</p>
      <p>Rating: {truck.rating}</p>
      {/* 추가 정보 표시 */}
    </div>
  );
}

export default FoodTruckInfo;
