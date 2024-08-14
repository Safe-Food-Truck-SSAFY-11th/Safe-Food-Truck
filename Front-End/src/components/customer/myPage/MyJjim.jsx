import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyJjim.module.css';
import useFoodTruckStore from 'store/trucks/useFoodTruckStore';
import defaultImage from 'assets/images/truck-img.png'

const MyJjim = ({ memberInfo, jjimTrucks }) => {
  const memberFavoriteList = jjimTrucks.memberFavoriteList || [];

  const [myJJimTrucks, setMyJJimTrucks] = useState([]);

  // 푸드트럭 디테일 정보 호출하는 함수와 스토어 호출
  const { getFoodTruck } = useFoodTruckStore();

  // 라우팅 시킬 네비게이트 훅
  const navigate = useNavigate();

  // 페이징 시킬 클릭 함수  
  const handleTruckClick = (storeId) => {
    navigate(`/FoodTruckDetail/${storeId}`);
  };

  // 반복문 돌면서 JJimTrucks에 찜 푸드트럭 디테일 담을거임
  useEffect(() => {

    // 내가 찜한 트럭만 가져오는 비동기 함수 선언
    const getMyJJimTrucks = async () => {
      try {
        // trucks는 memberFavoriteList의 길이만큼 반복 돌면서 찜한 푸드트럭의 storeId를 조회하고
        // 가져온 데이터인 JJimtruck을 담는 배열임
        const trucks = await Promise.all(
          memberFavoriteList.map(async (truck) => {
            const JJimtruck = await getFoodTruck(truck.storeId);
            return JJimtruck;
          })
        );

        setMyJJimTrucks(trucks);
      } catch (error) {
        console.error('찜 트럭 못 가져왔어요 ㅠㅜ', error);
      }
    };

    getMyJJimTrucks();
  }, [memberFavoriteList, getFoodTruck]);
  console.log(myJJimTrucks);

  return (
    <div className={styles.container}>
      {myJJimTrucks.length > 0 && (
        <h3 className={styles.JJimHeader}>{memberInfo.nickname} 🖐 님이 찜한 푸드트럭이에요!</h3>
      )}
      {myJJimTrucks.length === 0 ? (
        <div className={styles.noJJimTruck}>
        <p>{memberInfo.nickname} 님이 찜한 푸드트럭이 없어요 😅</p>
        </div>
      ) : (
        <ul>
          {myJJimTrucks.map((truck, index) => (
           <li
           key={index}
           className={styles.truckItem}
           onClick={() => handleTruckClick(truck.storeId)}
         >
           <div className={styles.truckContent}>
             {truck.storeImageDto.savedUrl === 'empty' || " " ? (
               <img 
               src={defaultImage} 
               alt="디폴트 이미지" 
               className={styles.truckImage}
                />
             ) : (
              <img
              src={truck.storeImageDto.savedUrl} 
              alt={truck.name} 
              className={styles.truckImage}
            />
             )}
             <div className={styles.truckDetails}>
               <h4 className={styles.truckName}>{truck.name}</h4>
               <p>{truck.storeType}</p>
               <p>
                 {truck.isOpen
                   ? `${truck.name} 트럭은 현재 영업중이에요!`
                   : `${truck.name} 트럭은 오늘 쉬어요😂`}
               </p>
             </div>
           </div>
         </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyJjim;
