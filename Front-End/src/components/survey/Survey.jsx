import React, { useState } from "react";
import Header from "components/common/Header";
import styles from "./Survey.module.css";
import MapModal from "./MapModal";
import axios from "utils/axiosInstance";
import { useNavigate } from "react-router-dom";

// 버튼 이미지
import snackBarBtn from "assets/images/surveyBtn/snackBar.png";
import chickenBtn from "assets/images/surveyBtn/chicken.png";
import stickBtn from "assets/images/surveyBtn/stick.png";
import iceCreamBtn from "assets/images/surveyBtn/iceCream.png";
import hotteokBtn from "assets/images/surveyBtn/hotteok.png";
import takoyakiBtn from "assets/images/surveyBtn/takoyaki.png";
import fishBreadBtn from "assets/images/surveyBtn/fishBread.png";
import beverageBtn from "assets/images/surveyBtn/beverage.png";
import crepeBtn from "assets/images/surveyBtn/crepe.png";
import cupbapBtn from "assets/images/surveyBtn/cupbap.png";
import steakBtn from "assets/images/surveyBtn/steak.png";
import pizzaBtn from "assets/images/surveyBtn/pizza.png";
import WarningModal from "./WarningModal";
import ConfirmModal from "./ConfirmModal";

const buttons = [
  { id: "snackBar", img: snackBarBtn, alt: "Snack Bar" },
  { id: "chicken", img: chickenBtn, alt: "Chicken" },
  { id: "stick", img: stickBtn, alt: "Stick" },
  { id: "iceCream", img: iceCreamBtn, alt: "Ice Cream" },
  { id: "hotteok", img: hotteokBtn, alt: "Hotteok" },
  { id: "takoyaki", img: takoyakiBtn, alt: "Takoyaki" },
  { id: "fishBread", img: fishBreadBtn, alt: "Fish Bread" },
  { id: "beverage", img: beverageBtn, alt: "Beverage" },
  { id: "crepe", img: crepeBtn, alt: "Crepe" },
  { id: "cupbap", img: cupbapBtn, alt: "Cupbap" },
  { id: "steak", img: steakBtn, alt: "Steak" },
  { id: "pizza", img: pizzaBtn, alt: "Pizza" },
];

function Survey() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [dong, setDong] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  const handleSearchBarClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = (lat, lng, address) => {
    setLatitude(lat);
    setLongitude(lng);
    setAddress(address);
    setIsModalOpen(false);
    parseAddress(address);
  };

  //수요조사 횟수제한 모달 확인버튼 함수
  const handleWarningConfirm = () => {
    setIsWarningOpen(false);
    navigate("/mainCustomer"); //다시 메인페이지로
  };

  //수요조사 등록완료 안내 모달 확인버튼 함수
  const handleConfirmConfirm = () => {
    setIsConfirmOpen(false);
    navigate("/mainCustomer"); //다시 메인페이지로
  };

  // 시도 시군구 동 자르기
  const parseAddress = (address) => {
    const parts = address.split(" ");
    if (parts.length >= 3) {
      setSido(parts[0]);
      setSigungu(parts[1]);
      setDong(parts[2]);
    }
  };

  const groupedButtons = [];
  for (let i = 0; i < buttons.length; i += 4) {
    groupedButtons.push(buttons.slice(i, i + 4));
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post("surveys", [
        {
          storeType: selectedButton,
          sido: sido,
          sigungu: sigungu,
          dong: dong,
          latitude: latitude,
          longitude: longitude,
        },
      ]);
      console.log(response.data);

      setIsConfirmOpen(true);
    } catch (error) {
      console.error("수요조사 등록 실패: ", error);
      if (
        error.response.data.errorMessage ===
        "수요조사는 email당 하루 1회만 신청할 수 있습니다."
      ) {
        setIsWarningOpen(true);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.surveyContainer}>
          <h2 className={styles.surveyTitle}>
            <span className={styles.userName}>
              {sessionStorage.getItem("nickname")}
            </span>{" "}
            님이 원하는
            <br />
            푸드트럭이 있으신가요?
          </h2>
          <p>동네로 찾아갈게요!</p>
          <div className={styles.btnContainer}>
            {groupedButtons.map((group, index) => (
              <div key={index} className={styles.btnArea}>
                {group.map((button) => (
                  <img
                    key={button.id}
                    src={button.img}
                    alt={button.alt}
                    className={
                      selectedButton === button.id ? styles.selected : ""
                    }
                    onClick={() => handleButtonClick(button.id)}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.searchBar} onClick={handleSearchBarClick}>
            <span role="img" aria-label="search" className={styles.searchIcon}>
              🔍
            </span>
            <span className={styles.searchInput}>
              {address || "주소를 검색하세요"}
            </span>
          </div>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            제출할게요
          </button>
        </div>
      </div>
      {isModalOpen && (
        <MapModal onClose={handleModalClose} onConfirm={handleModalConfirm} />
      )}
      {isWarningOpen && <WarningModal onConfirm={handleWarningConfirm} />}

      {isConfirmOpen && <ConfirmModal onConfirm={handleConfirmConfirm} />}
    </>
  );
}

export default Survey;
