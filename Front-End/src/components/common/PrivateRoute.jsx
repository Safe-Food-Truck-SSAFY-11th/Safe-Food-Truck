import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from 'store/users/userStore';

const PrivateRoute = ({ children }) => {
    const {getLoginedEmail} = useUserStore(); // 사용자 인증 상태를 가져옴

  if (!getLoginedEmail()) {
    alert('세이푸트 회원만 이용가능 합니다.');
    return <Navigate to="/login" />; // 인증되지 않은 경우 로그인 페이지로 리디렉션
  }

  return children; // 인증된 경우 해당 경로의 컴포넌트를 렌더링
};

export default PrivateRoute;