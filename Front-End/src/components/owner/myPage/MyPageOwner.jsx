import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../common/Header";
import OwnerInfo from "./OwnerInfo";
import SalesChart from "./SalesChart";
import useUserStore from 'store/users/userStore';

const MyPageOwner = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (!token || role.indexOf('owner') == -1) {
      alert('접근 권한이 없습니다.');
      navigate('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);

  if (!isAuthorized) {
    return null;
  }

  const containerStyle = {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  

  const handleMembershipBtn = () => {
    // 멤버십 가입 페이지 이동
    navigate('/membership');
  }

  return (
    <div style={containerStyle}>
      <Header />
      <OwnerInfo />
      <SalesChart />
      <button onClick={handleMembershipBtn}>멤버십 가입</button>
    </div>
  );
};

export default MyPageOwner;
