import React from 'react';
import BroadCastItem from './BroadCastItem';
import styles from './BroadCastList.module.css';

function BroadCastList() {
  const items = [1, 2, 3, 4]; // 반복할 요소의 개수

  return (
    <div className={styles.broadcastList}>
      {items.map((item, index) => (
        <BroadCastItem key={index} />
      ))}
    </div>
  );
}

export default BroadCastList;
