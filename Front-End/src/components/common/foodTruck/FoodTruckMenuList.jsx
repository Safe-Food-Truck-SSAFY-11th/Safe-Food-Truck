import React from 'react';
import FoodTruckMenuItem from './FoodTruckMenuItem';
import styles from './FoodTruckMenuList.module.css';

const menuItems = [
  { id: 1, name: '기본 닭꼬치', price: 4000, image: 'chicken-skewer.png' },
  { id: 2, name: '치즈 닭꼬치', price: 5000, image: 'chicken-skewer-cheese.png' },
  { id: 3, name: '매운 닭꼬치', price: 5000, image: 'chicken-skewer-spicy.png' },
  { id: 4, name: '파 닭꼬치', price: 5000, image: 'chicken-skewer-leek.png' },
  { id: 5, name: '마늘 닭꼬치', price: 5000, image: 'chicken-skewer-garlic.png' },
  { id: 6, name: '프리미엄 닭꼬치', price: 7000, image: 'chicken-skewer-premium.png' },
];

function FoodTruckMenuList() {
  return (
    <div className={styles.menuList}>
      {menuItems.map(item => (
        <FoodTruckMenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default FoodTruckMenuList;
