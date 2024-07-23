import React from 'react';
import styles from './BroadCastItem.module.css';

function BroadCastItem() {
  return (
    <div className={styles.broadcastItem}>
      <div className={styles.imagePlaceholder}></div>
    </div>
  );
}

export default BroadCastItem;
