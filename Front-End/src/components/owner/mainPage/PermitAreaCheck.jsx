/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapMarker from "assets/images/ft_marker.png";
import styles from "./PermitAreaCheck.module.css";
import useStatusStore from "store/trucks/statusStore";
import { MdMyLocation } from "react-icons/md";
import usePermitAreaStore from "store/trucks/usePermitAreaStore";

const PermitAreaCheck = () => {
  const [currLat, setCurrLat] = useState(36.3553601); // 기본값 설정
  const [currLon, setCurrLon] = useState(127.2983893); // 기본값 설정
  const [currSido, setCurrSido] = useState("");
  const [currSigungu, setCurrSigungu] = useState("");
  const {
    permitAreaList,
    filteredAreaList,
    filterByRegion,
    updateCoordinates,
    addCoord,
    coordList,
  } = usePermitAreaStore(); //허가구역

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
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false&libraries=services`;
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

        // 현재 위치 시군구 저장하기
        const geocoder = new window.kakao.maps.services.Geocoder();
        // 좌표 -> 주소로 바꾸는 콜백함수
        const getAddress = (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setCurrSido(result[0].address.region_1depth_name);
            setCurrSigungu(result[0].address.region_2depth_name);
          }
        };

        //주소 -> 좌표로 바꾸는 콜백함수
        let coordX;
        let coordY;
        const getCoords = (result, status, address) => {
          if (status === window.kakao.maps.services.Status.OK) {
            coordX = result[0].x; //경도
            coordY = result[0].y; //위도
            console.log(coordX, coordY);
            addCoord(coordY, coordX); //좌표 리스트에 저장
            drawCircle(map, coordY, coordX); // 좌표가 준비된 후 원 그리기
          }
        };

        //푸드트럭 허가구역 필터링 하기 (알단 하드코딩) -> currSido, currSigungu로 변경할 것
        const sido = "대전";
        const sigungu = "대덕구";
        // 필터링된 리스트가 비어있을 때만 필터링
        if (filteredAreaList.length === 0) {
          filterByRegion(sigungu, sido);
        }

        //현재 위치 좌표로 바꾸기
        geocoder.coord2Address(currLon, currLat, getAddress);

        // filteredAreaList를 반복하면서 원을 그리거나 함수 호출
        filteredAreaList.forEach((data) => {
          const { 위도, 경도, 소재지도로명주소, 소재지지번주소 } = data;

          // 위도와 경도가 있는 경우 원 그리기
          if (위도 && 경도) {
            //위도 lat y, 경도 lon x
            drawCircle(map, 위도, 경도);
            addCoord(위도, 경도);
          }
          // 위도와 경도가 없고 소재지도로명주소가 있는 경우
          else if (소재지도로명주소) {
            console.log(소재지도로명주소);
            console.log("도로명");
            geocoder.addressSearch(소재지도로명주소, (result, status) =>
              getCoords(result, status, 소재지도로명주소)
            );
          }
          // 소재지도로명주소가 없고 소재지지번주소가 있는 경우
          else if (소재지지번주소) {
            console.log(소재지지번주소);
            console.log("지번");
            geocoder.addressSearch(소재지지번주소, (result, status) =>
              getCoords(result, status, 소재지지번주소)
            );
          }
        });
      });
    };

    script.onerror = (err) => {
      console.error("카카오맵 스크립트를 로드하는 데 실패했습니다.");
    };
  }, [
    currLat,
    currLon,
    currSido,
    currSigungu,
    filterByRegion,
    updateCoordinates,
    addCoord,
    // filteredAreaList,
    // filteredAreaList.length,
  ]);

  // 원을 지도에 그리는 함수
  const drawCircle = (map, lat, lon) => {
    console.log("그렸어용");
    const circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(lat, lon), // 원의 중심좌표
      radius: 500, // 미터 단위의 원의 반지름
      strokeWeight: 3, // 선의 두께
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
    console.log(coordList);

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

  //현재 위치가 허가 구역 내에 있는지 검증하는 함수

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
