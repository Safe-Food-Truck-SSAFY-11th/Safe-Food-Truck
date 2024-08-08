import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/common/Header';
import TruckStatus from './TruckStatus';
import OpenClose from './OpenClose';
import JiguemOrder from './JiguemOrder';
import styles from './MainOwner.module.css';
import useTruckStore from "store/users/owner/truckStore";
import StoreRegistModal from "./StoreRegistModal";

const MainOwner = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { truckInfo, fetchTruckInfo } = useTruckStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchTruckInfo();
  }, []);
  
  useEffect(() => {
    if (truckInfo.errorMessage === '해당 점포는 존재하지 않습니다.') {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }
  }, [truckInfo]);

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

  const handleCloseModal = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <Header />
      <TruckStatus />
      <OpenClose />
      <JiguemOrder />
      <StoreRegistModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
      />
    </div>
  );
};

export default MainOwner;