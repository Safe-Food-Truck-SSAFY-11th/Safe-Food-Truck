import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StoreRegistModal.module.css';

const StoreRegistModal = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>푸드트럭 등록</h2>
        <p>푸드트럭이 등록되지 않았습니다.</p>
        <p> 점포를 등록해주세요.</p>
        <button onClick={() => navigate('/registTruck')}>점포 등록하기</button>
        <button onClick={onRequestClose}>로그아웃</button>
      </div>
    </div>
  );
};

export default StoreRegistModal;
