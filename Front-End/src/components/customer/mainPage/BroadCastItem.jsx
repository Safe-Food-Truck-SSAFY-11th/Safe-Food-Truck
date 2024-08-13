import React from 'react';
import styles from './BroadCastItem.module.css';

function BroadCastItem({ storeInfo }) {
  console.log("이미지: ", storeInfo.storeImageDto.savedUrl);
  return (
    <div>
      <div className={styles.broadcastItem}>
        <div className={styles.imageWrapper}>
          <div className={styles.imagePlaceholder}>
            <img src={storeInfo.storeImageDto.savedUrl} alt="store" />
          </div>
        </div>
        <a className={styles.liveListName}>{storeInfo.name}</a>
      </div>
    </div>
  );
}

export default BroadCastItem;
