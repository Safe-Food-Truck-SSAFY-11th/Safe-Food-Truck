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
      <button onClick={handleDeleteAcct}>탈퇴하기</button>
    </div>
  );
};

export default MyPageOwner;
