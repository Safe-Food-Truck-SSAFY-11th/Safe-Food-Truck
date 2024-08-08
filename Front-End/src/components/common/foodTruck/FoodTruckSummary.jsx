import React, { useEffect, useState } from "react";
import styles from "./FoodTruckSummary.module.css";
import axios from "axios";
import useLiveStore from "store/live/useLiveStore";
import { useParams, useNavigate } from "react-router-dom";
import NoLiveModal from "./NoLiveModal";
import useFoodTruckStore from "store/trucks/useFoodTruckStore";
import customerStore from "store/users/customer/customerStore";

function FoodTruckSummary({ truck }) {
  const { isModalOpen, openModal } = useLiveStore();
  const navigate = useNavigate();

  const APPLICATION_SERVER_URL = "https://i11b102.p.ssafy.io/";

  //현재 방송 중인지 확인하는 함수
  const isLive = async (sessionId) => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + "api/sessions/" + sessionId,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 204) {
        console.log(response);
        //모달 띄우기
        openModal();
      } else {
        //라이브 페이지로 이동
        const token = response.data; // The token
        navigate(`/live/${sessionId}`, { state: { token: token } }); // token을 함께 전달
        return response.data; // The token
      }
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  };

  //라이브 방송보기 버튼 클릭
  const handleLiveClick = () => {
    console.log(storeId);
    isLive(storeId);
  };

  // 찜하기 찜 삭제하기 함수 호출을 위한 스토어 사용
  const { JJimTruck, unJJimTruck } = useFoodTruckStore();

  // 찜 트럭을 가져오고 내가 찜한 트럭을 반환하는 스토어 사용
  const { getJJimTruck, myJJimTruck } = customerStore();

  // foodTruckDetail/13 일 경우 13번 storeId를 갖는 디테일을 갖고 오기 위해 Params 사용
  const { storeId } = useParams();

  // 찜 되어 있는 트럭인지 체크하기 위한 상태 관리
  const [isJJimmed, setIsJJimmed] = useState(false);

  // myJJimTruck에서 Params를 통해 가져온 storeId가 존재하는지 체크하고 존재한다면 찜 여부를 세팅해야 하기 때문에
  // favoriteId를 관리할 상태
  const [favoriteId, setFavoriteId] = useState(null);

  // 찜한 트럭인지 확인하기 전까지 로딩중임을 표시할 상태 ㅜ
  const [loading, setLoading] = useState(true);

  // 찜 한 트럭인지 체크하기 위한 함수 -> 더 좋은 로직 있을거 같은데 일단 지금은 이게 한계,,,
  const checkJJimTruck = async () => {
    await getJJimTruck();
    // 내가 찜한 트럭이 있는지 먼저 조건문으로 확인 하고
    if (myJJimTruck && myJJimTruck.memberFavoriteList) {
      // 내가 찜한 트럭에 대한 정보 저장
      const favoriteTruck = myJJimTruck.memberFavoriteList.find(
        (favTruck) => favTruck.storeId === parseInt(storeId, 10)
      );

      // 만약에 찜한 트럭이 맞다면?
      if (favoriteTruck) {
        // 찜 트럭이 있다고 체크 해주고
        setIsJJimmed(true);

        // 해당 찜 트럭의 favoriteId 저장
        setFavoriteId(favoriteTruck.favoriteId);

        // 아님 말고 ㅎ
      } else {
        setIsJJimmed(false);
        setFavoriteId(null);
      }
    }
    setLoading(false); // 로딩 완료
  };

  useEffect(() => {
    checkJJimTruck();
  }, [storeId]); // storeId, getJJimTruck, myJJimTruck를 의존성 배열에 추가

  // 그냥 버튼 누르면 실행되는 함수
  const handleJJimTruck = async () => {
    try {
      if (isJJimmed) {
        await unJJimTruck(favoriteId);
        alert(`${truck.name} 트럭이 찜 목록에서 제거되었습니다.`);
      } else {
        await JJimTruck(truck.storeId);
        alert(`${truck.name} 트럭이 찜 목록에 추가되었습니다.`);
      }
      checkJJimTruck(); // 상태를 갱신하여 버튼 텍스트를 업데이트합니다.
    } catch (error) {
      console.error("찜 등록/삭제 실패", error);
      alert("찜 등록/삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return <div>찜 여부 체크중이에요 ..... </div>;
  }

  return (
    <header className={styles.header}>
      <h1>{truck.name}</h1>
      <p>{truck.description}</p>
      <p>★ {truck.rating}</p>
      <button className={styles.jjimButton} onClick={handleJJimTruck}>
        {isJJimmed ? "찜 삭제" : "찜하기"}
      </button>

      <button onClick={handleLiveClick}>LIVE 방송보기</button>
      {isModalOpen && <NoLiveModal />}
    </header>
  );
}

export default FoodTruckSummary;
