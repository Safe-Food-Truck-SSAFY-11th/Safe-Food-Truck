import { useEffect } from "react";
import styles from "./MapModal.module.css";

const MapModal = ({ onClose, onConfirm }) => {
  let map;
  let marker;

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const mapContainer = document.getElementById("map");
            const mapOption = {
              center: new window.kakao.maps.LatLng(lat, lon),
              level: 3,
            };
            map = new window.kakao.maps.Map(mapContainer, mapOption);

            const markerPosition = map.getCenter();
            marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: map,
            });

            window.kakao.maps.event.addListener(map, "center_changed", () => {
              const latlng = map.getCenter();
              marker.setPosition(latlng);
            });

            document.getElementById("confirmBtn").onclick = () => {
              const latlng = map.getCenter();
              getAddressFromCoords(
                latlng.getLat(),
                latlng.getLng(),
                (address) => {
                  onConfirm(latlng.getLat(), latlng.getLng(), address);
                }
              );
            };

            document.getElementById("currentLocationBtn").onclick = () => {
              map.setCenter(new window.kakao.maps.LatLng(lat, lon));
              marker.setPosition(new window.kakao.maps.LatLng(lat, lon));
            };
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
      });
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 좌표 -> 주소
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

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div id="map" className={styles.map}></div>
        <div className={styles.btnContainer}>
          <button className={styles.button} id="currentLocationBtn">현재 위치로</button>
          <button className={styles.button} id="confirmBtn">확인</button>
          <button className={styles.button} onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
