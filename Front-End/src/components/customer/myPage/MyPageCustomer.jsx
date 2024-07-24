import React, { useState } from 'react';
import CustomerInfo from './CustomerInfo';
import OrderNow from './OrderNow';
import OrderPast from './OrderPast';
import SobiPattern from './SobiPattern';
import MyReviewList from './MyReviewList';
import MyJjim from './MyJjim';

const MyPageCustomer = () => {
  const [selectedComponent, setSelectedComponent] = useState('pattern'); // 기본값 설정
  const [activeButton, setActiveButton] = useState(''); // 활성화된 버튼 상태

  const handleSelect = (component, button) => {
    if (activeButton === button) {
      setSelectedComponent('pattern'); // 기본 컴포넌트로 설정
      setActiveButton('');
    } else {
      setSelectedComponent(component);
      setActiveButton(button);
    }
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'liked':
        return <MyJjim />;
      case 'review':
        return <MyReviewList />;
      case 'order':
        return <OrderPast />;
      default:
        return <SobiPattern />;
    }
  };

  return (
    <div>
      <CustomerInfo onSelect={handleSelect} activeButton={activeButton} />
      <OrderNow />
      {renderSelectedComponent()}
    </div>
  );
};

export default MyPageCustomer;
