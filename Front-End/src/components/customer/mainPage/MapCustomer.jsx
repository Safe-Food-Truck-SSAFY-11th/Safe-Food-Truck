import React from 'react';
import styles from './MapCustomer.module.css';

function MapCustomer({ selectedType }) {
  

  return (
    <div className={styles.mapContainer}>
      <img src="map-placeholder.png" alt="푸드트럭 지도" className={styles.mapImage} />
    </div>
  );
}

export default MapCustomer;
