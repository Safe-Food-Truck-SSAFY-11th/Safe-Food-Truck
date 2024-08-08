import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/common/Header';
import TruckStatus from './TruckStatus';
import OpenClose from './OpenClose';
import JiguemOrder from './JiguemOrder';
import styles from './MainOwner.module.css';

const MainOwner = () => {
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

  return (
    <div className={styles.container}>
      <Header />
      <TruckStatus />
      <OpenClose />
      <JiguemOrder />
    </div>
  );
};

export default MainOwner;