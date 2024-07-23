import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoodTruckList from './components/customer/mainPage/FoodTruckList';
import FoodTruckDetail from './components/common/foodTruck/FoodTruckDetail';
import FoodTruckMenuDetail from './components/common/foodTruck/FoodTruckMenuDetail';
import './App.css';
// import BroadCastList from './components/customer/mainPage/BroadcastList';
import MainCustomer from './components/customer/mainPage/MainCustomer';
function App() {

  const menu = {
    name: '프리미엄 닭꼬치',
    image: '/path/to/image.png', // 실제 이미지 경로로 변경
    description: '닭꼬치에 추가 가능한 모든 재료와 특제 소스가 들어간 프리미엄 닭꼬치 입니다!',
    price: 7000
  };

  return (
    <div className="App">
      <FoodTruckDetail />
    </div>
  );
}

export default App;
