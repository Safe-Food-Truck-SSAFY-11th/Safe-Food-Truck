import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MapCustomer.module.css';
import markerImage from 'assets/images/ft_marker.png'; // 이미지 경로 import

function MapCustomer({ openFoodTrucks, userLocation }) {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(userLocation);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error('Kakao maps library is not loaded properly.');
        return;
      }

      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 지도를 표시할 div
        const options = {
          center: new window.kakao.maps.LatLng(currentLocation?.latitude, currentLocation?.longitude),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        // 마커 크기 설정
        const markerImageSize = new window.kakao.maps.Size(45, 45);
        const markerImageOptions = {
          offset: new window.kakao.maps.Point(22.5, 45),
        };

        const markerImageObj = new window.kakao.maps.MarkerImage(
          markerImage,
          markerImageSize,
          markerImageOptions
        );

        const addMarker = (location) => {
          const latitude = parseFloat(location.latitude);
          const longitude = parseFloat(location.longitude);
          if (isNaN(latitude) || isNaN(longitude)) {
            console.error('Invalid latitude or longitude for location:', location);
            return;
          }

          const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImageObj, // 커스텀 아이콘 설정
          });
          marker.setMap(map);

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${location.name}</div>`,
          });

          // InfoWindow를 마커 위에 강제로 표시
          infowindow.open(map, marker);

          window.kakao.maps.event.addListener(marker, 'click', function () {
            navigate(`/foodtruckDetail/${location.storeId}`);
          });
        };

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
          const R = 6371; // 지구의 반경 (km)
          const dLat = ((lat2 - lat1) * Math.PI) / 180;
          const dLon = ((lon2 - lon1) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return distance;
        };

        const filterAndAddMarkers = () => {
          const bounds = map.getBounds(); // 현재 지도의 범위 가져오기
          const locations = openFoodTrucks.storeInfoResponseDtos || [];

          locations.forEach((location) => {
            const latitude = parseFloat(location.latitude);
            const longitude = parseFloat(location.longitude);
            const position = new window.kakao.maps.LatLng(latitude, longitude);

            // 현재 위치와 푸드트럭 위치 간의 거리 계산
            const distance = calculateDistance(
              currentLocation.latitude,
              currentLocation.longitude,
              latitude,
              longitude
            );

            if (bounds.contain(position) && distance <= 5) { // 5km 이내의 푸드트럭만 필터링
              addMarker(location);
            }
          });
        };

        // 버튼 클릭 시 필터링된 마커 추가
        const searchCurrentLocation = () => {
          map.relayout(); // 지도의 크기나 위치가 변경된 경우 다시 그리기
          filterAndAddMarkers();
        };

        // 현재 위치 갱신
        const updateCurrentLocation = () => {
          const center = map.getCenter();
          setCurrentLocation({
            latitude: center.getLat(),
            longitude: center.getLng(),
          });
          alert('현재 위치가 갱신되었습니다!');
        };

        // 검색 버튼 클릭 이벤트 리스너 추가
        document.getElementById('searchButton').addEventListener('click', searchCurrentLocation);
        // 현재 위치 갱신 버튼 클릭 이벤트 리스너 추가
        document.getElementById('updateLocationButton').addEventListener('click', updateCurrentLocation);
      });
    };

    script.onerror = () => {
      console.error('카카오맵 불러오기에 실패하였습니다.');
    };

    console.log(openFoodTrucks);
  }, [navigate, openFoodTrucks, currentLocation]);

  return (
    <div className={styles.mapContainer}>
      <button id="searchButton" className={styles.searchButton}>
        현위치에서 검색
      </button>
      <button id="updateLocationButton" className={styles.updateLocationButton}>
        현위치 갱신
      </button>
      <div id="map" className={styles.map}></div>
    </div>
  );
}

export default MapCustomer;
