import React, { useState, useEffect } from 'react';
import CustomerInfo from './CustomerInfo';
import OrderNow from './OrderNow';
import OrderPast from './OrderPast';
import SobiPattern from './SobiPattern';
import MyReviewList from './MyReviewList';
import MyJjim from './MyJjim';
import customerStore from 'store/users/customer/customerStore';
import useUserStore from 'store/users/userStore';

const MyPageCustomer = () => {
  const [selectedComponent, setSelectedComponent] = useState('pattern'); // 기본값 설정
  const [activeButton, setActiveButton] = useState(''); // 활성화된 버튼 상태
  const { memberInfo, getMemberInfo } = customerStore();
  
  
  useEffect(() => {

    getMemberInfo();

  }, [getMemberInfo]);
  
  console.log(memberInfo)
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
        return <MyJjim memberInfo={memberInfo} />;
      case 'review':
        return <MyReviewList memberInfo={memberInfo} />;
      case 'order':
        return <OrderPast memberInfo={memberInfo} />;
      default:
        return <SobiPattern memberInfo={memberInfo} />;
    }
  };

  const handleDeleteAcct = async () => {
    const confirmed = window.confirm('정말 탈퇴하시겠습니까?');
    if (confirmed) {
        try {
            const deleteUser = useUserStore.getState().deleteUser;
            await deleteUser();
            alert('탈퇴가 완료되었습니다.');
            // 필요 시 리디렉션
            window.location.href = '/login'; 
        } catch (error) {
            console.error('회원 탈퇴 오류:', error);
            alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    }
  };

  if (!memberInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomerInfo onSelect={handleSelect} activeButton={activeButton} memberInfo={memberInfo} />
      <p>- - - - - - - - 현재 주문 내역 - - - - - - - -</p>
      <OrderNow memberInfo={memberInfo} />
      {renderSelectedComponent()}
      <button onClick={handleDeleteAcct}>탈퇴하기</button>
    </div>
  );
};

export default MyPageCustomer;
