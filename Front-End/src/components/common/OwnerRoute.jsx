import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'store/users/userStore';

const OwnerRoute = ({ children }) => {
  const navigate = useNavigate();
  const { getLoginedEmail, getLoginedRole } = useUserStore();

  useEffect(() => {
    if (!getLoginedEmail() || getLoginedRole().indexOf('owner') === -1) {
      alert('사장님 전용 페이지 입니다.');
      navigate(-1); // 인증되지 않은 경우 뒤로 가기
    }
  }, [getLoginedEmail, getLoginedRole, navigate]);

  return getLoginedEmail() && getLoginedRole().indexOf('owner') !== -1 
    ? children 
    : null; // 인증된 경우에만 children을 렌더링
};

export default OwnerRoute;
