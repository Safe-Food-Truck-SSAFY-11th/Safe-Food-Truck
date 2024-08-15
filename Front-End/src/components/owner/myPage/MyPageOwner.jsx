import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../common/Header";
import OwnerInfo from "./OwnerInfo";
import SalesChart from "./SalesChart";
import useUserStore from 'store/users/userStore';

const MyPageOwner = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
 
  useEffect(() => {
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

  const membershipStyle = {
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5%',
    fontSize: '0.9rem',
    color: '#5f5f5f',
    marginBottom: '3%',
  };

  const memberJoin = {
    border: 'none',
    color: 'violet',
  }

  const handleMembershipBtn = () => {
    // 멤버십 가입 페이지 이동
    navigate('/membership');
  }

  return (
    <div style={containerStyle}>
      <Header />
      <OwnerInfo />
      <SalesChart />
      <div style={membershipStyle}>
        {role.indexOf('vip') === -1 ? <p>멤버십에 가입하실래요?</p> : <p>멤버십을 연장하실래요?</p>}
        {role.indexOf('vip') === -1 ? <a style={memberJoin} onClick={handleMembershipBtn}>멤버십 가입</a> : <a style={memberJoin} onClick={handleMembershipBtn}>멤버십 관리</a>}
      </div>
    </div>
  );
};

export default MyPageOwner;
