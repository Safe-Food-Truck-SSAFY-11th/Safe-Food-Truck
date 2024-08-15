import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'store/users/userStore';

const CustomerRoute = ({ children }) => {
  const navigate = useNavigate();
  const { getLoginedEmail, getLoginedRole } = useUserStore();

  useEffect(() => {
    if (!getLoginedEmail() || getLoginedRole().indexOf('customer') === -1) {
      alert('손님 전용 페이지 입니다.');
      navigate(-1); // 이전 페이지로 이동
    }
  }, [getLoginedEmail, getLoginedRole, navigate]);

  return getLoginedEmail() && getLoginedRole().indexOf('customer') !== -1 
    ? children 
    : null; // 인증된 경우에만 children을 렌더링
};

export default CustomerRoute;
