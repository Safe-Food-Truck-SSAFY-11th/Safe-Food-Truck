import React from 'react';
import FoodTruckMenuItem from './FoodTruckMenuItem';
import styles from './FoodTruckMenuList.module.css'; // 필요한 경우 스타일 파일 추가

function FoodTruckMenuList({ menus }) {
  const menuItems = Array.isArray(menus) ? menus : [];

  if (menuItems.length === 0) {
    return <div>아직 트럭에 등록된 메뉴가 없어요</div>;
  }

  return (
    <div className={styles.menuList}>
      {menuItems.map((item) => (
        <FoodTruckMenuItem key={item.menuId} item={item} />
      ))}
    </div>
  );
}

export default FoodTruckMenuList;
