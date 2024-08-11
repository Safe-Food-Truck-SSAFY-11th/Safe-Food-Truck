/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapMarker from "assets/images/ft_marker.png";
import styles from "./PermitAreaCheck.module.css";
import useStatusStore from "store/trucks/statusStore";
import useTruckStore from "store/users/owner/truckStore";
import { MdMyLocation } from "react-icons/md";
import usePermitAreaStore from "store/trucks/usePermitAreaStore";
import AreaWarning from "./AreaWarning";

const PermitAreaCheck = () => {
  const [currLat, setCurrLat] = useState(36.3553601); // 기본값 설정
  const [currLon, setCurrLon] = useState(127.2983893); // 기본값 설정
  const currSidoRef = useRef("");
  const [mapCenterLat, setMapCenterLat] = useState();
  const [mapCenterLon, setMapCenterLon] = useState();

  const [filteredAreaList, setFilteredAreaList] = useState([]);

  const { permitAreaList, addCoord, coordList, isOpen, openWarning } =
    usePermitAreaStore(); //허가구역

  const mapRef = useRef(null); // 지도 객체를 참조할 ref
  const currLocationRef = useRef([currLat, currLon]); // 트럭 현재 위치를 참조할 ref

  const navigate = useNavigate();

  const { truckInfo, switchStatus, changeLocation } = useTruckStore();

  //현재 위치의 시도를 기준으로 허가구역 필터링
  const filterByRegion = (sido) => {
    setFilteredAreaList(
      permitAreaList.filter((area) => {
        return area.시도명.includes(sido);
      })
    );
  };

  //여기서 할래요 버튼 클릭
  const handleSelectClick = () => {
    if (!isPermitArea()) {
      // 허가구역이 아닌 경우
      openWarning();
    } else {
      switchStatus();
      changeLocation(currLat, currLon);
      navigate("/mainOwner");
    }
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
        //지도 처음위치도 현재위치로
        setMapCenterLat(position.coords.latitude);
        setMapCenterLon(position.coords.longitude);
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
          center: new window.kakao.maps.LatLng(mapCenterLat, mapCenterLon),
          level: 7,
        };
        const map = new window.kakao.maps.Map(container, options);

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        mapRef.current = map; // 지도 객체를 ref에 저장

        // 마커 이미지 설정
        const imageSrc = mapMarker;
        const imageSize = new window.kakao.maps.Size(50, 54);
        const imageOption = { offset: new window.kakao.maps.Point(27, 54) };

        // 현재 위치 표시
        const markerPosition = new window.kakao.maps.LatLng(currLat, currLon);
        currLocationRef.current = markerPosition; //현재 위치 ref 저장
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

        // 현재 위치 시도 저장하기
        const geocoder = new window.kakao.maps.services.Geocoder();
        // 좌표 -> 주소로 바꾸는 콜백함수
        const getAddress = async (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            currSidoRef.current = result[0].address.region_1depth_name;
            console.log(currSidoRef.current);
            //푸드트럭 허가구역 필터링 하기
            if (filteredAreaList.length === 0) {
              await filterByRegion(currSidoRef.current);
            }
          }
        };

        //주소 -> 좌표로 바꾸는 콜백함수
        let coordX;
        let coordY;
        const getCoords = (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            coordX = result[0].x; //경도
            coordY = result[0].y; //위도
            addCoord(coordY, coordX); //좌표 리스트에 저장
            drawCircle(map, coordY, coordX); // 좌표가 준비된 후 원 그리기
          }
        };

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
            geocoder.addressSearch(소재지도로명주소, getCoords);
          }
          // 소재지도로명주소가 없고 소재지지번주소가 있는 경우
          else if (소재지지번주소) {
            geocoder.addressSearch(소재지지번주소, getCoords);
          }
        });
        // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록
        window.kakao.maps.event.addListener(
          mapRef.current,
          "center_changed",
          function () {
            // 지도의 중심좌표를 얻어옵니다 지속적으로 갱신함
            var latlng = mapRef.current.getCenter();
            setMapCenterLat(latlng.getLat());
            setMapCenterLon(latlng.getLng());
          }
        );
      });
    };

    script.onerror = (err) => {
      console.error("카카오맵 스크립트를 로드하는 데 실패했습니다.");
    };
  }, [addCoord, filteredAreaList.length]);

  // 원을 지도에 그리는 함수
  const drawCircle = (map, lat, lon) => {
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

  // 현재 위치 이동 함수
  const resetLocation = () => {
    // 현재위치 확인
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrLat(position.coords.latitude);
        setCurrLon(position.coords.longitude);
        currLocationRef.current = new window.kakao.maps.LatLng(
          currLat,
          currLon
        ); //새로운 현재 위치 ref 저장
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
  const isPermitArea = () => {
    const line = new window.kakao.maps.Polyline();

    let isInside = false; // 구역 내에 있는지 여부

    coordList.forEach((coord) => {
      // 허가구역 좌표도 LatLng 형식으로 변환
      const permitAreaCoord = new window.kakao.maps.LatLng(coord[0], coord[1]);

      // 현재 위치와 허가구역 중심을 경로로 하는 폴리라인 설정
      const path = [currLocationRef.current, permitAreaCoord];
      // console.log(path, typeof path);
      line.setPath(path);

      // 현재 위치와 허가구역 중심 사이의 거리
      const dist = line.getLength();

      // 허가구역 반경 500m 이내라면 구역 내에 위치함
      if (dist <= 500) {
        isInside = true; // 구역 내에 있음
        return; // forEach 루프 종료
      }
    });

    return isInside;
  };

  return (
    <>
      <div className={styles.compSize}>
        <h3>오늘은 어디서 장사할까요? 🤔</h3>
        <div className={styles.permitAreaCheck}>
          <div id="map" className={styles.map}>
            <div className={styles.resetControl}>
              <MdMyLocation
                className={styles.resetBtn}
                onClick={resetLocation}
              />
            </div>
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
        {isOpen && <AreaWarning />}
      </div>
    </>
  );
};

export default PermitAreaCheck;
