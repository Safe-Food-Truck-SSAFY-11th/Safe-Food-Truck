import React, { useState, useEffect } from 'react';
import CustomerInfo from './CustomerInfo';
import OrderNow from './OrderNow';
import OrderPast from './OrderPast';
import SobiPattern from './SobiPattern';
import MyReviewList from './MyReviewList';
import MyJjim from './MyJjim';
import customerStore from 'store/users/customer/customerStore';
import useUserStore from 'store/users/userStore';
import useReviewStore from 'store/reviews/useReviewStore';
import customerOrderStore from 'store/orders/customerOrderStore'
import Header from 'components/common/Header';

const MyPageCustomer = () => {

  // 마이 페이지 접속 했을때 기본 상태 설정과 상태별 다른 컴포넌트 구성하기
  const [selectedComponent, setSelectedComponent] = useState('pattern'); 

  // 어떤 버튼 눌려있는지 확인하고 상태 변경
  const [activeButton, setActiveButton] = useState(''); // 활성화된 버튼 상태

  // 내 정보 , 내가 찜한 트럭 가져오는 스토어 , 함수 호출
  const { 
    memberInfo, 
    getMemberInfo,
    getJJimTrucks, 
    myJJimTrucks,
    getSobiPattern,
    mySobiPattern, 
  } = customerStore(); 

  // 내 과거 주문 기록 불러오는 스토어 , 함수 호출
  const { 
    // 내 과거 주문 목록 전체 조회 함수
    getMyOrders, 
    // 위에 함수로 가져올 객체
    pastOrders, 
    // orderId로 가져올 해당 주문의 상세 정보
    getOrderDetails, 
    // 위에 함수로 가져올 객체 
    nowOrder,
    // 현재 주문 아이디 세팅하는 함수
    setNowOrderId,
    // 위에 함수로 가져올 객체
    nowOrderId, 
    // 지금 진행중인 주문 목록 가져오는 함수
    getNowOrder,
    // 위에 함수로 가져올 객체
    orderNow,
  } = customerOrderStore();
  
  // 내가 작성한 리뷰 가져오는 스토어 , 함수 호출
  const { getAllMyReview, myReviews } = useReviewStore(); 
  
  useEffect(() => {
    
    // 리뷰 목록 가져옴
    getAllMyReview();
    // 회원 정보 가져옴
    getMemberInfo();
    // 찜 트럭 가져옴
    getJJimTrucks();
    // 내 과거 주문 목록 가져옴
    getMyOrders();
    // 소비패턴 가져옴
    getSobiPattern();
    // 현재 진행중인 주문 가져옴
    getNowOrder();

  },[]);



  useEffect(() => {

    if (nowOrderId) {
      getOrderDetails(nowOrderId);
    }
  }, [getOrderDetails]);
  
  const handleSelect = (component, button) => {

    if (activeButton === button) {

      setSelectedComponent('pattern'); // 기본 컴포넌트로 설정
      setActiveButton('');

    } else {

      setSelectedComponent(component);
      setActiveButton(button);

    }
  };

  // 위에서 api 요청을 통해 받은 데이터들 props로 자식 컴포넌트에 전달 하는거 확인 "보라색"
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'liked':
        return <MyJjim memberInfo={memberInfo} jjimTrucks={myJJimTrucks} />;
      case 'review':
        return <MyReviewList memberInfo={memberInfo} myReviews={myReviews} />;
      case 'order':
        return <OrderPast memberInfo={memberInfo} pastOrders={pastOrders} myReviews={myReviews} />;
      default:
        return <SobiPattern memberInfo={memberInfo} mySobiPattern={mySobiPattern} />;
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
      <Header />
      <CustomerInfo onSelect={handleSelect} activeButton={activeButton} pastOrders={pastOrders} memberInfo={memberInfo} />
      <OrderNow memberInfo={memberInfo} orderNow={orderNow} />
      {renderSelectedComponent()}
      <button onClick={handleDeleteAcct}>탈퇴하기</button>
    </div>
  );
};

export default MyPageCustomer;
