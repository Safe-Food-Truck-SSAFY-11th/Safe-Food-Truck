import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CustomerInfo.module.css';

const CustomerInfo = ({ user = {}, onSelect, activeButton }) => {
  const { name = '용훈', visitCount = 0 } = user;
  const navigate = useNavigate();

  const handleProfileEdit = () => {
    navigate('/customerUpdate');
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img alt="Profile" className={styles.profileImage} />
        <button className={styles.profileButton} onClick={handleProfileEdit}>
          내 정보 수정
        </button>
      </div>
      <div className={styles.infoSection}>
        <h2>반갑습니다 {name}님! 👏</h2>
        <p>오늘 푸드트럭 어때요?</p>
        <p>지금까지 푸드트럭 {visitCount}번 만났어요!</p>
        <div className={styles.buttons}>
          <button
            className={`${styles.actionButton} ${activeButton === 'liked' ? styles.active : ''}`}
            onClick={() => onSelect('liked', 'liked')}
          >
            찜한 푸드트럭
          </button>
          <button
            className={`${styles.actionButton} ${activeButton === 'review' ? styles.active : ''}`}
            onClick={() => onSelect('review', 'review')}
          >
            작성한 리뷰
          </button>
          <button
            className={`${styles.actionButton} ${activeButton === 'order' ? styles.active : ''}`}
            onClick={() => onSelect('order', 'order')}
          >
            구매 내역
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
