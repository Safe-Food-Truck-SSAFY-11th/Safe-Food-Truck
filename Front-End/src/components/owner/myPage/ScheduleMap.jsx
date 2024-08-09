import { useEffect, useRef, useState } from "react";
import styles from "./ScheduleMap.module.css";

const ScheduleMap = ({ onConfirm, initialAddress }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        const mapContainer = mapRef.current;
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 위치
          level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(kakaoMap);

        const kakaoMarker = new window.kakao.maps.Marker({
          position: kakaoMap.getCenter(),
          map: kakaoMap,
        });
        setMarker(kakaoMarker);

        if (initialAddress) {
          searchAddressToCoordinate(initialAddress, (latlng) => {
            kakaoMap.setCenter(latlng);
            kakaoMarker.setPosition(latlng);
            setCenter(latlng);
          });
        }

        // 현재 위치로 이동하는 기능 추가
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const currentLocation = new window.kakao.maps.LatLng(lat, lon);

            kakaoMap.setCenter(currentLocation); // 지도의 중심을 현재 위치로 설정
            kakaoMarker.setPosition(currentLocation); // 마커 위치도 현재 위치로 설정
            setCenter(currentLocation);
          },
          (error) => {
            console.error("Error occurred while retrieving location:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );

        window.kakao.maps.event.addListener(kakaoMap, "center_changed", () => {
          const latlng = kakaoMap.getCenter();
          kakaoMarker.setPosition(latlng);
          setCenter(latlng);
        });
      });
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [initialAddress]);

  const searchAddressToCoordinate = (address, callback) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const latlng = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        callback(latlng);
      } else {
        console.error("주소 변환 실패: ", status);
      }
    });
  };

  const getAddressFromCoords = (lat, lng, callback) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name;
        callback(address);
      }
    });
  };

  const handleConfirmClick = () => {
    if (center) {
      getAddressFromCoords(center.getLat(), center.getLng(), (address) => {
        onConfirm(address);
      });
    }
  };

  const handleCurrentLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const currentLocation = new window.kakao.maps.LatLng(lat, lon);

        map.setCenter(currentLocation); // 지도의 중심을 현재 위치로 설정
        marker.setPosition(currentLocation); // 마커 위치도 현재 위치로 설정
        setCenter(currentLocation);
      },
      (error) => {
        console.error("Error occurred while retrieving location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map}></div>
      <div className={styles.btnArea}>
        <button onClick={handleConfirmClick} className={styles.confirmButton}>
          주소 입력
        </button>
        <button onClick={handleCurrentLocationClick} className={styles.currentLocationButton}>
          현재 위치로
        </button>
      </div>
    </div>
  );
};

export default ScheduleMap;
