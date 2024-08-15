import React from 'react';
import styles from './FoodFilter.module.css';
import all from 'assets/images/foodImage/all.png';
import boonsik from 'assets/images/foodImage/boonsik.png';
import chicken from 'assets/images/foodImage/chicken.png';
import crepe from 'assets/images/foodImage/crepe.png';
import cupRice from 'assets/images/foodImage/cupRice.png';
import drink from 'assets/images/foodImage/drink.png';
import fish from 'assets/images/foodImage/fish.png';
import iceCream from 'assets/images/foodImage/iceCream.png';
import panCake from 'assets/images/foodImage/panCake.png';
import pizza from 'assets/images/foodImage/pizza.png';
import steak from 'assets/images/foodImage/steak.png';
import kkochi from 'assets/images/foodImage/kkochi.png';
import tako from 'assets/images/foodImage/tako.png';


const FoodFilter = ({ selectedType, onSelectType }) => {
  const types = [
    { id: 'all', label: '전 체', icon: all },      
    { id: '분식', label: '분 식', icon: boonsik },     
    { id: '치킨', label: '치  킨', icon: chicken },     
    { id: '꼬치', label: '꼬  치', icon: kkochi }, // 이미지 파일이 없을 경우 이모지 사용
    { id: '아이스크림', label: '아이스크림', icon: iceCream },    
    { id: '호떡', label: '호  떡', icon: panCake },       
    { id: '타코야끼', label: '타코야끼', icon: tako }, // 이미지 파일이 없을 경우 이모지 사용
    { id: '음료', label: '음  료', icon: drink },        
    { id: '붕어빵', label: '붕 어 빵', icon: fish },    
    { id: '피자', label: '피  자', icon: pizza },        
    { id: '스테이크', label: '스테이크', icon: steak }, 
    { id: '컵밥', label: '컵  밥', icon: cupRice },        
    { id: '크레페', label: '크레페', icon: crepe },   
  ];
  
  return (
    <div className={styles.foodFilter}>
      {types.map((type) => (
        <button
          key={type.id}
          className={`${styles.filterButton} ${selectedType === type.id ? styles.selected : ''}`}
          onClick={() => onSelectType(type.id)}
        >
          <img src={type.icon} alt={type.label} className={styles.icon} />
          <span>{type.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FoodFilter;
