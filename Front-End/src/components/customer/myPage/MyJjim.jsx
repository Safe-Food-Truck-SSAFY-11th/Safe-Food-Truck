import React from 'react';
import styles from './MyJjim.module.css';

const MyJjim = ({ memberInfo, jjimTrucks }) => {
  const memberFavoriteList = jjimTrucks.memberFavoriteList || [];

  console.log(memberFavoriteList);

  return (
    <div className={styles.container}>
      {memberFavoriteList.length > 0 && (
        <h3>{memberInfo.nickname} 님이 찜한 푸드트럭이에요!</h3>
      )}
      {memberFavoriteList.length === 0 ? (
        <p>{memberInfo.nickname} 님이 찜한 푸드트럭이 없어요 😅</p>
      ) : (
        <ul>
          {memberFavoriteList.map(truck => (
            <li key={truck.id} className={styles.truckItem}>{truck.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyJjim;
