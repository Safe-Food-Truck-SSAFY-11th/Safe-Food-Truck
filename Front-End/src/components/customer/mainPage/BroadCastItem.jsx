import React, { useEffect } from 'react';
import styles from './BroadCastItem.module.css';
import axiosInstance from 'utils/axiosInstance';

function BroadCastItem() {
  useEffect(()=>{
    getLiveList()
  }, []);
  const getLiveList = async () => {
    const response = await axiosInstance.get("");
  }
  return (
    <div className={styles.broadcastItem}>
      <div className={styles.imagePlaceholder}>
        가나다라
      </div>
    </div>
  );
}

export default BroadCastItem;
