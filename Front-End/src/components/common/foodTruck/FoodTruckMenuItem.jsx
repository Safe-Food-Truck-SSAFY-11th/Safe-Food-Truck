import React from 'react';
import styles from './FoodTruckMenuItem.module.css';
import { useNavigate } from 'react-router-dom';

// 부모 컴포넌트로 부터 전달받은 menu 한 개 객체
function FoodTruckMenuItem({ item , storeId }) {
  
  // 라우팅 시킬 네비게이트 훅 선언
  const navigate = useNavigate();

  // 요소 클릭시 메뉴 객체 정보를 갖고 페이지 라우팅 시킴
  const handleClick = () => {
    navigate(`/menuDetail/${item.menuId}`, { state: { item , storeId } });
  };

  return (
    <div className={styles.menuItem} onClick={handleClick}>
      <div className={styles.imageContainer}>
        {item.menuImageDto ? (
          <img src={item.menuImageDto.savedUrl} alt={'사진'} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            이미지 없음
          </div>
        )}
      </div>
      <div className={styles.details}>
        <h3>{item.name}</h3>
        <span>{item.description}</span>
        <span>{item.price.toLocaleString()}원</span> {/* 숫자에 쉼표 추가 */}
      </div>
    </div>
  );
}

export default FoodTruckMenuItem;
