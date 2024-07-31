/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapMarker from "../../../assets/images/ft_marker.png";
import styles from "./PermitAreaCheck.module.css";
import useStatusStore from "../../../store/trucks/statusStore";
import { MdMyLocation } from "react-icons/md";

const PermitAreaCheck = () => {
  const [currLat, setCurrLat] = useState(36.3553601); // 기본값 설정
  const [currLon, setCurrLon] = useState(127.2983893); // 기본값 설정
  const mapRef = useRef(null); // 지도 객체를 참조할 ref
  const navigate = useNavigate();

  const { status, setStatus } = useStatusStore();

  const handleSelectClick = () => {
    setStatus("afterOpen");
    navigate("/mainOwner");
  };
  const handleCancleClick = () => {
    navigate("/mainOwner");
  };

  useEffect(() => {
    // 현재위치 확인
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrLat(position.coords.latitude);
        setCurrLon(position.coords.longitude);
      },
      (error) => {
        console.error("Error occurred while retrieving location:", error);
      }
    );

    const kakaoMapApiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;

    if (!kakaoMapApiKey) {
      console.error("카카오맵 API 키가 설정되지 않았습니다.");
      return;
    }

    // 카카오맵 API 불러오기
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(currLat, currLon),
          level: 7,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map; // 지도 객체를 ref에 저장

        // 마커 이미지 설정
        const imageSrc = mapMarker;
        const imageSize = new window.kakao.maps.Size(50, 54);
        const imageOption = { offset: new window.kakao.maps.Point(27, 54) };

        // 현재 위치 표시
        const markerPosition = new window.kakao.maps.LatLng(currLat, currLon);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);

        // 원 그리기 함수 호출
        drawCircle(map, currLat, currLon);
      });
    };

    script.onerror = (err) => {
      console.error("카카오맵 스크립트를 로드하는 데 실패했습니다.");
    };
  }, [currLat, currLon]);

  // 원을 지도에 그리는 함수
  const drawCircle = (map, lat, lon) => {
    const circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(lat, lon), // 원의 중심좌표
      radius: 500, // 미터 단위의 원의 반지름
      strokeWeight: 5, // 선의 두께
      strokeColor: "#75B8FA", // 선의 색깔
      strokeOpacity: 1, // 선의 불투명도
      strokeStyle: "solid", // 선의 스타일
      fillColor: "#CFE7FF", // 채우기 색깔
      fillOpacity: 0.7, // 채우기 불투명도
    });

    // 지도에 원을 표시
    circle.setMap(map);
  };

  // 줌 인 함수
  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setLevel(mapRef.current.getLevel() - 1);
    }
  };

  // 줌 아웃 함수
  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setLevel(mapRef.current.getLevel() + 1);
    }
  };

  // 현재 위치 이동 함수
  const resetLocation = () => {
    // 현재위치 확인
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrLat(position.coords.latitude);
        setCurrLon(position.coords.longitude);
      },
      (error) => {
        console.error("Error occurred while retrieving location:", error);
      }
    );

    if (mapRef.current) {
      const moveLatLon = new window.kakao.maps.LatLng(currLat, currLon);
      mapRef.current.panTo(moveLatLon);
    }
  };

  return (
    <>
      <div className={styles.compSize}>
        <h3>오늘은 어디서 장사할까요? 🤔</h3>
        <div className={styles.permitAreaCheck}>
          <div id="map" className={styles.map}></div>
          <div className={styles.zoomControls}>
            <button className={styles.zoomIn} onClick={zoomIn}>
              +
            </button>
            <button className={styles.zoomOut} onClick={zoomOut}>
              -
            </button>
          </div>
          <div className={styles.resetControl}>
            {/* <button className={styles.resetBtn} onClick={resetLocation}>
              리셋
            </button> */}
            <MdMyLocation className={styles.resetBtn} onClick={resetLocation} />
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.allowButton} onClick={handleSelectClick}>
            여기서 할래요
          </button>
          <button className={styles.denyButton} onClick={handleCancleClick}>
            안할래요
          </button>
        </div>
      </div>
    </>
  );
};

export default PermitAreaCheck;
