import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MapCustomer.module.css';
import markerImage from 'assets/images/ft_marker.png'; // 이미지 경로 import

function MapCustomer({ openFoodTrucks , userLocation }) {
  const navigate = useNavigate();


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
          
          // geolocation 으로 계산해서 전달된 userLocation의 위도 경도 체크해서 중앙 좌표로 사용
          center: new window.kakao.maps.LatLng(userLocation?.latitude, userLocation?.longitude),

          // 지도의 확대 레벨
          level: 3,

        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        // 마커 크기 설정
        const markerImageSize = new window.kakao.maps.Size(45, 45);

        const markerImageOptions = {

          // 마커 위치 설정
          offset: new window.kakao.maps.Point(22.5, 45)

        };


        const markerImageObj = new window.kakao.maps.MarkerImage(
          markerImage,
          markerImageSize,
          markerImageOptions
        );

        // 마커 표시하는 로직
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
            image: markerImageObj // 커스텀 아이콘 설정
          });
          marker.setMap(map);

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${location.name}</div>`
          });

          // InfoWindow를 마커 위에 강제로 표시
          infowindow.open(map, marker);

          window.kakao.maps.event.addListener(marker, 'click', function() {
            navigate(`/foodtruckDetail/${location.storeId}`);
          });
        };

        // 푸드트럭들의 위치를 담아서 마커 추가하는 함수 반복문으로 돌림
        const locations = openFoodTrucks.storeInfoResponseDtos || [];

        locations.forEach(location => {
          addMarker(location);
        });
      });
    };

    script.onerror = () => {
      console.error('카카오맵 불러오기에 실패하였습니다.');
    };

    console.log(openFoodTrucks)

  }, [navigate, openFoodTrucks]);

  return (
    <div className={styles.mapContainer}>
      <div id="map" className={styles.map}></div>
    </div>
  );
}

export default MapCustomer;
