import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MapCustomer.module.css';
import markerImage from '../../../assets/images/ft_marker.png'; // 이미지 경로 import

function MapCustomer({ selectedType }) {
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = 'bb662920ed50821a974fe0e873815b8b';
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
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심 좌표 (서울 시청)
          level: 3, // 지도의 확대 레벨
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        const foodTruckLocations = [
          { id: 1, name: "Food Truck 1", lat: 37.5665, lng: 126.9780 },
          { id: 2, name: "Food Truck 2", lat: 37.5651, lng: 126.9895 },
          { id: 3, name: "Food Truck 3", lat: 37.5641, lng: 126.9750 }
        ];

        const markerImageSize = new window.kakao.maps.Size(45, 45); // 아이콘 이미지 크기
        const markerImageOptions = {
          offset: new window.kakao.maps.Point(22.5, 45) // 아이콘 이미지의 좌표
        };

        const markerImageObj = new window.kakao.maps.MarkerImage(
          markerImage,
          markerImageSize,
          markerImageOptions
        );

        foodTruckLocations.forEach(location => {
          const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lng); 
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImageObj // 커스텀 아이콘 설정
          });
          marker.setMap(map);

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${location.name}</div>`
          });

          window.kakao.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map, marker);
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });

          window.kakao.maps.event.addListener(marker, 'click', function() {
            navigate(`/foodtruck/${location.id}`);
          });
        });
      });
    };

    script.onerror = () => {
      console.error('카카오맵 불러오기에 실패하였습니다.');
    };

  }, [navigate]);

  return (
    <div className={styles.mapContainer}>
      <div id="map" className={styles.map}></div>
    </div>
  );
}

export default MapCustomer;
