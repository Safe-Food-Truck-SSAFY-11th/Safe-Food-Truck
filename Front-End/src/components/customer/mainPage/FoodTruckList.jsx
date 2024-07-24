import React, { useEffect } from 'react';
import FoodTruckItem from './FoodTruckItem';
import useFoodTruckStore from '../../../store/trucks/useFoodTruckStore';
import styles from './FoodTruckList.module.css';

function FoodTruckList({ selectedType }) {
  const foodTrucks = useFoodTruckStore((state) => state.foodTrucks);
  const fetchFoodTrucks = useFoodTruckStore((state) => state.fetchFoodTrucks);

  useEffect(() => {
    fetchFoodTrucks();
  }, [fetchFoodTrucks]);

  const filteredTrucks = foodTrucks.filter(truck =>
    (selectedType === 'all' || truck.menuCategory === selectedType) && truck.openStatus === 1
  );

  return (
    <div className={styles.foodTruckList}>
      {filteredTrucks.map(truck => (
        <FoodTruckItem
          key={truck.id}
          name={truck.name}
          category={truck.menuCategory}
          address={truck.longitude}
          rating={5.0}
        />
      ))}
    </div>
  );
}

export default FoodTruckList;
