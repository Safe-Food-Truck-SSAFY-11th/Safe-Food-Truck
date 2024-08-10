import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodTruckItem from './FoodTruckItem';
import styles from './FoodTruckList.module.css';
import axios from 'axios';

function FoodTruckList({ openFoodTrucks, userLocation }) {
  const trucks = openFoodTrucks.storeInfoResponseDtos || [];
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchAddresses = async () => {
      const addressPromises = trucks.map(async (truck) => {
        const { latitude, longitude } = truck;

        const distance = calculateDistance(userLocation.latitude, userLocation.longitude, latitude, longitude);

        if (distance <= 5) {
          const address = await getAddressFromCoordinates(latitude, longitude);
          return { ...truck, address, distance };
        }

        return null;
      });

      const resolvedAddresses = (await Promise.all(addressPromises)).filter(truck => truck !== null);
      setAddresses(resolvedAddresses);
    };

    fetchAddresses();
  }, [trucks, userLocation]);

  const getAddressFromCoordinates = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      });
      const addressInfo = response.data.documents[0];
      if (addressInfo) {
        return addressInfo.address.address_name;  // 도로명 주소 반환
      }
      return '주소 정보를 찾을 수 없습니다.';
    } catch (error) {
      console.error('지오코딩 에러 ㅜ', error);
      return '주소 정보를 찾을 수 없습니다.';
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadian = (degree) => (degree * Math.PI) / 180;
    const R = 6371;

    const deltaLat = toRadian(lat2 - lat1);
    const deltaLon = toRadian(lon2 - lon1);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  return (
    <div className={styles.foodTruckList}>
      {Array.isArray(addresses) && addresses.length > 0 ? (
        addresses.map(truck => (
          <FoodTruckItem
            key={truck.storeId}
            name={truck.name}
            category={truck.menuCategory}
            address={truck.address}
            distance={truck.distance}
            imageUrl={truck.storeImageDto?.savedUrl} // 이미지 URL 전달
            onClick={() => navigate(`/foodtruckDetail/${truck.storeId}`)} // 클릭 시 디테일 페이지로 이동
          />
        ))
      ) : (
        <p>현재 근처에 영업중인 푸드트럭이 없어요😂</p>
      )}
    </div>
  );
}

export default FoodTruckList;
