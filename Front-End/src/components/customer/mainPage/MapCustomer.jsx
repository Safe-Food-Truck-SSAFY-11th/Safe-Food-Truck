import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MapCustomer.module.css';
import markerImage from 'assets/images/ft_marker.png'; // 이미지 경로 import

function MapCustomer({ openFoodTrucks, userLocation }) {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(userLocation);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // 카카오 map api 호출하는 영역입니다
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
          level: 4,
        };

        // 지도 표시할 객체 map 생성 하는 메서드 입니당.
        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);

        // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록
        window.kakao.maps.event.addListener(mapInstance, 'center_changed', function() {
          // 지도의 중심좌표를 얻어옵니다 지속적으로 갱신함
          var latlng = mapInstance.getCenter();
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

  // 마커 및 infowindow 추가 함수
  const addMarker = (truck) => {
    const latitude = truck.latitude;
    const longitude = truck.longitude;

    // 위도 경도가 숫자가 아닐경우 에러 반환하고 함수 종료
    if (isNaN(latitude) || isNaN(longitude)) {
      console.error('Invalid latitude or longitude for location:', truck);
      return;
    }

    // 마커 찍을 좌표 설정
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    // 마커 크기 설정 및 마커 위치 설정하는 부분.
    const markerImageSize = new window.kakao.maps.Size(45, 45);

    const markerImageOptions = {
      // 마커 이미지 위치 설정 함 기준점에서 22.5px 만큼 오른쪽, 45px 만큼 아래쪽)
      offset: new window.kakao.maps.Point(22.5, 45),
    };

    // marker의 정보를 담는 객체 생성
    const markerImageObj = new window.kakao.maps.MarkerImage(
      // 어떤 사진 쓸건지 경로 설정한 변수고
      markerImage,
      // 마커 사이즈는 얼마인지 설정한 정보를 담는 변수고
      markerImageSize,
      // 마커 위치 기준점으로 부터 어디에 박을건지 정보를 담은 변수
      markerImageOptions
    );

    // 이제 진짜 마커 정보를 생성하고
    const marker = new window.kakao.maps.Marker({
      // 좌표는 위에서 저장한 markerPosition 으로
      position: markerPosition,
      // 아이콘은 아까 저장한 정보임 이미지 , 좌표 , 앵커 위치
      image: markerImageObj,
    });

    // 푸드트럭 이름을 가져와서 InfoWindow 형태로 표시 할건데
    // 내부 내용으로 트럭 이름을 표시할거고 스타일을 인라인으로 작성한거임
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div>${truck.name}</div>`,
    });

    // 마커와 infowindow를 함께 저장
    setMarkers((prevMarkers) => [...prevMarkers, { marker, infowindow }]);

    // 맵에다가 찍음 ㅇㅇ
    marker.setMap(map);

    // InfoWindow를 마커 위에 표시
    infowindow.open(map, marker);

    // 지도 위에 찍힌 마커를 클릭 했을때 navigate 호출해서 해당 푸드트럭 id를 갖고 라우팅 시키는 부분임
    window.kakao.maps.event.addListener(marker, 'click', function () {
      navigate(`/foodtruckDetail/${truck.storeId}`);
    });
  };

  // 이건 내 위치부터 5km 이내 푸드트럭 계산하는 로직인데 지 쌤이 짜준거라 잘 몰라요ㅜ
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
    // 기존 마커 및 infowindow 제거
    markers.forEach(({ marker, infowindow }) => {
      marker.setMap(null);
      infowindow.close();
    });
    setMarkers([]);

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
    filterAndAddMarkers();
  };

  // 현재 위치 갱신
  const updateCurrentLocation = () => {
    if (map) {
      const latlng = map.getCenter();
      setCurrentLocation({
        latitude: latlng.getLat(),
        longitude: latlng.getLng(),
      });
    }
  };

  return (
    <div className={styles.mapContainer}>
      <button id="searchButton" className={styles.searchButton} onClick={searchCurrentLocation}>
        현위치에서 검색
      </button>
      <button id="updateLocationButton" className={styles.updateLocationButton} onClick={updateCurrentLocation}>
        현위치 갱신
      </button>
      <div id="map" className={styles.map}></div>
    </div>
  );
}

export default MapCustomer;
