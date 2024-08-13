import React from 'react';
import FoodTruckMenuItem from './FoodTruckMenuItem';
import styles from './FoodTruckMenuList.module.css'; 

function FoodTruckMenuList({ menus , storeId }) {

  // 부모 컴포넌트로 부터 전달받은 menus 객체 상태 체크 후 작업 시작
  const menuItems = Array.isArray(menus) ? menus : [];

  // 잘 가져왔나 체크 
  // console.log(menuItems)

  // 가져온 데이터에 메뉴가 담긴게 없다면 트럭에 등록된 메뉴 없음을 리턴
  if (menuItems.length === 0) {
    return (
  <div className={styles.container}>
    <div className={styles.noMenuList}>아직 트럭에 등록된 메뉴가 없어요! 🤣</div>
  </div>
    )
  }

  // menuItems에 들어있는 요소들을 반복문 돌면서 렌더링 함
  return (
    <div className={styles.menuList}>
      {menuItems.map((item) => (
        <FoodTruckMenuItem key={item.menuId} storeId={storeId} item={item} />
      ))}
    </div>
  );
}

export default FoodTruckMenuList;
