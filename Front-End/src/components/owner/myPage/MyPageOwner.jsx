import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../common/Header";
import OwnerInfo from "./OwnerInfo";
import SalesChart from "./SalesChart";

const MyPageOwner = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (!token || role !== 'owner') {
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

  return (
    <div style={containerStyle}>
      <Header />
      <OwnerInfo />
      <SalesChart />
    </div>
  );
};

export default MyPageOwner;
