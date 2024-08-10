import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MapCustomer.module.css';
import markerImage from 'assets/images/ft_marker.png'; // 이미지 경로 import

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

    const markerImageSize = new window.kakao.maps.Size(45, 45);
    const markerImageOptions = {
      offset: new window.kakao.maps.Point(22.5, 45),
    };

    const markerImageObj = new window.kakao.maps.MarkerImage(
      markerImage,
      markerImageSize,
      markerImageOptions
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImageObj,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div>${truck.name}</div>`,
    });

    setMarkers((prevMarkers) => [...prevMarkers, { marker, infowindow }]);

    marker.setMap(map);

    infowindow.open(map, marker);

    window.kakao.maps.event.addListener(marker, 'click', function () {
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
    markers.forEach(({ marker, infowindow }) => {
      marker.setMap(null);
      infowindow.close();
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
