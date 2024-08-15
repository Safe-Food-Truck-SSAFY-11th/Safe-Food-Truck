import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MapCustomer.module.css';
import markerImage from 'assets/images/ft_marker.png'; 
import defaultImage from 'assets/images/truck-img.png';
import boonsik from 'assets/images/foodImage/boonsik.png';
import chicken from 'assets/images/foodImage/chicken.png';
import crepe from 'assets/images/foodImage/crepe.png';
import cupRice from 'assets/images/foodImage/cupRice.png';
import drink from 'assets/images/foodImage/drink.png';
import fish from 'assets/images/foodImage/fish.png';
import iceCream from 'assets/images/foodImage/iceCream.png';
import kkochi from 'assets/images/foodImage/kkochi.png';
import panCake from 'assets/images/foodImage/panCake.png';
import pizza from 'assets/images/foodImage/pizza.png';
import steak from 'assets/images/foodImage/steak.png';
import tako from 'assets/images/foodImage/tako.png';


function MapCustomer({ openFoodTrucks, userLocation, selectedType }) {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(userLocation);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredTrucks, setFilteredTrucks] = useState([]); // 필터링된 트럭 상태

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
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(currentLocation?.latitude, currentLocation?.longitude),
          level: 4,
          zoomControl: true,
          panControl: true,
        };

        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);

        const zoomControl = new window.kakao.maps.ZoomControl();
        mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        const panControl = new window.kakao.maps.MapTypeControl();
        mapInstance.addControl(panControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        window.kakao.maps.event.addListener(mapInstance, 'center_changed', function () {
          const latlng = mapInstance.getCenter();
          setCurrentLocation({
            latitude: latlng.getLat(),
            longitude: latlng.getLng(),
          });
        });
      });
    };

    script.onerror = () => {
      console.error('카카오맵 불러오기에 실패하였습니다.');
    };
  }, []);

  useEffect(() => {
    if (map) {
      filterAndAddMarkers();
    }
  }, [selectedType, filteredTrucks]); // selectedType 또는 filteredTrucks가 변경될 때마다 필터링

  const addMarker = (truck) => {
    const latitude = truck.latitude;
    const longitude = truck.longitude;
  
    if (isNaN(latitude) || isNaN(longitude)) {
      console.error('Invalid latitude or longitude for location:', truck);
      return;
    }
  
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
  
    const getMarkerImage = (storeType) => {
      switch (storeType) {
        case '분식':
          return boonsik; 
        case '치킨':
          return chicken;
        case '꼬치':
          return kkochi; 
        case '아이스크림':
          return iceCream; 
        case '호떡':
          return panCake; 
        case '타코야끼':
          return tako; 
        case '음료':
          return drink; 
        case '붕어빵':
          return fish; 
        case '피자':
          return pizza; 
        case '스테이크':
          return steak; 
        case '컵밥':
          return cupRice; 
        case '크레페':
          return crepe; 
        default:
          return markerImage; // 기본 마커 이미지 경로
      }
    };

    const markerImageSrc = getMarkerImage(truck.storeType);
  
    const markerImageSize = new window.kakao.maps.Size(35, 35);
    const markerImageOptions = {
      offset: new window.kakao.maps.Point(22.5, 45),
    };
  
    const markerImageObj = new window.kakao.maps.MarkerImage(
      markerImageSrc, // 조건에 따라 설정된 마커 이미지 경로
      markerImageSize,
      markerImageOptions
    );
  
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImageObj,
    });
  
    const overlayContent = document.createElement('div');
    overlayContent.style = `
      cursor: pointer; 
      display: flex; 
      align-items: center; 
      padding: 10px; 
      background-color: white; 
      border-radius: 5px; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);`;

    const img = document.createElement('img');
    img.src = truck.storeImageDto?.savedUrl === 'empty' || truck.storeImageDto?.savedUrl.trim() === "" ? defaultImage : truck.storeImageDto?.savedUrl;
    img.alt = truck.name;
    img.style = "width: 40px; height: 40px; object-fit: cover; border-radius: 5px; margin-right: 10px;";

    const textDiv = document.createElement('div');
    const title = document.createElement('div');
    title.style = "font-weight: bold; font-size: 14px;";
    title.textContent = truck.name;
    const star = document.createElement('div');
    star.style = "font-size: 12px; color: #666;";
    star.textContent = `★ ${truck.averageStar / 2}`;

    textDiv.appendChild(title);
    textDiv.appendChild(star);

    overlayContent.appendChild(img);
    overlayContent.appendChild(textDiv);
  
    const overlay = new window.kakao.maps.CustomOverlay({
      content: overlayContent,
      position: markerPosition,
      yAnchor: 1.8,
      zIndex: 3, 
    });
  
    setMarkers((prevMarkers) => [...prevMarkers, { marker, overlay }]);
  
    marker.setMap(map);

    window.kakao.maps.event.addListener(marker, 'click', function () {
      overlay.setMap(map);
    });

    overlayContent.addEventListener('click', function () {
      navigate(`/foodtruckDetail/${truck.storeId}`);
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
    markers.forEach(({ marker, overlay }) => {
      marker.setMap(null);
      overlay.setMap(null);
    });
    setMarkers([]);

    const filtered = filteredTrucks.filter((location) =>
      selectedType === 'all' || location.storeType === selectedType
    );

    filtered.forEach((location) => {
      addMarker(location);
    });
  };

  const searchCurrentLocation = () => {
    const bounds = map.getBounds();
    const locations = openFoodTrucks.storeInfoResponseDtos || [];

    const filtered = locations.filter((location) => {
      const latitude = parseFloat(location.latitude);
      const longitude = parseFloat(location.longitude);
      const position = new window.kakao.maps.LatLng(latitude, longitude);

      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        latitude,
        longitude
      );

      return bounds.contain(position) && distance <= 5;
    });

    setFilteredTrucks(filtered);
  };

  return (
    <div className={styles.mapContainer}>
      <button id="searchButton" className={styles.searchButton} onClick={searchCurrentLocation}>
        현위치에서 검색
      </button>
      <div id="map" className={styles.map}></div>
    </div>
  );
}

export default MapCustomer;
