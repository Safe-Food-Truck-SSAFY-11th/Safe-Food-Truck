import React from 'react';
import styles from './FoodFilter.module.css';

const FoodFilter = ({ selectedType, onSelectType }) => {
  const types = [
    { id: 'all', label: '전체', icon: '🍽️' },
    { id: 'skewer', label: '꼬치', icon: '🍢' },
    { id: 'takoyaki', label: '타코야끼', icon: '🐙' },
    { id: 'steak', label: '스테이크', icon: '🥩' },
    { id: 'chicken', label: '닭강정', icon: '🍗' },
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
