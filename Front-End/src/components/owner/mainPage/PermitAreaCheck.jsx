import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapMarker from '../../../assets/images/ft_marker.png';
import styles from './PermitAreaCheck.module.css';
import useStatusStore from '../../../store/trucks/statusStore';

const PermitAreaCheck = () => {
    const [currLat, setCurrLat] = useState(36.3553601);  // 기본값 설정
    const [currLon, setCurrLon] = useState(127.2983893);  // 기본값 설정

    const { status, setStatus } = useStatusStore();
    const navigate = useNavigate();
    const handleSelectClick = () => {
        setStatus('afterOpen');
        navigate('/mainOwner');
    };
    const handleCancleClick = () => {
        navigate('/mainOwner');
    };

    useEffect(() => {
        // 현재위치 확인
        // navigator.geolocation.getCurrentPosition((position) => {
        //     setCurrLat(position.coords.latitude);
        //     setCurrLon(position.coords.longitude);
        // }, (error) => {
        //     console.error('Error occurred while retrieving location:', error);
        // });

        const kakaoMapApiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;

        if (!kakaoMapApiKey) {
            console.error('카카오맵 API 키가 설정되지 않았습니다.');
            return;
        }

        // 카카오맵 API 불러오기
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(currLat, currLon),
                    level: 3
                };
                const map = new window.kakao.maps.Map(container, options);

                // 마커 이미지 설정
                const imageSrc = mapMarker;
                const imageSize = new window.kakao.maps.Size(50, 54);
                const imageOption = {offset: new window.kakao.maps.Point(27, 54)};

                // 현재 위치 표시
                const markerPosition = new window.kakao.maps.LatLng(currLat, currLon);
                const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage
                });
                marker.setMap(map);

                
            });
        };

        script.onerror = () => {
            console.error('카카오맵 스크립트를 로드하는 데 실패했습니다.');
        };
    }, [currLat, currLon]);

    return (
        <>
            <div className={styles.compSize}>
                <h3>오늘은 어디서 장사할까요? 🤔</h3>
                <div className={styles.permitAreaCheck}>
                    <div id="map" className={styles.map}></div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.allowButton} onClick={handleSelectClick}>여기서 할래요</button>
                    <button className={styles.denyButton} onClick={handleCancleClick}>안할래요</button>
                </div>
            </div>
        </>
    );
};

export default PermitAreaCheck;
