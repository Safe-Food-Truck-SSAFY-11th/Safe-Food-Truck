import React from 'react';
import styles from './FoodFilter.module.css';

const FoodFilter = ({ selectedType, onSelectType }) => {
  const types = [
    { id: 'all', label: '전 체', icon: '🍽️' },      
    { id: '분식', label: '분 식', icon: '🍢' },     
    { id: '치킨', label: '치 킨', icon: '🍗' },     
    { id: '꼬치', label: '꼬 치', icon: '🍡' },
    { id: '아이스크림', label: '아이스크림', icon: '🧁'},    
    { id: '호떡', label: '호 떡', icon: '🥞' },       
    { id: '타코야끼', label: '타코야끼', icon: '🐙' },
    { id: '음료', label: '음 료', icon: '🥤' },        
    { id: '붕어빵', label: '붕 어 빵', icon: '🐟' },    
    { id: '피자', label: '피 자', icon: '🍕' },        
    { id: '스테이크', label: '스테이크', icon: '🥩' }, 
    { id: '컵밥', label: '컵 밥', icon: '🍚' },        
    { id: '크레페', label: '크레페', icon: '🍧' },   
  ];
  
  return (
    <div className={styles.foodFilter}>
      {types.map((type) => (
        <button
          key={type.id}
          className={`${styles.filterButton} ${selectedType === type.id ? styles.selected : ''}`}
          onClick={() => onSelectType(type.id)}
        >
          <span className={styles.icon}>{type.icon}</span>
          <span>{type.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FoodFilter;
