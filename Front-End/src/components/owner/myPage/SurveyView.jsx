import { useState, useEffect } from "react";
import axiosInstance from "utils/axiosInstance";
import styles from "./Chart.module.css";

const regions = {
  서울: {
    종로구: ["청운효자동", "사직동", "삼청동"],
    중구: ["소공동", "회현동", "명동"],
    용산구: ["이태원동", "한남동", "보광동"],
  },
  부산: {
    중구: ["중앙동", "동광동", "대청동"],
    서구: ["동대신동", "서대신동", "부민동"],
    동구: ["초량동", "수정동", "좌천동"],
  },
  대구: {
    중구: ["동인동", "삼덕동", "성내동"],
    동구: ["신암동", "신천동", "효목동"],
    서구: ["비산동", "평리동", "원대동"],
  },
  인천: {
    중구: ["신포동", "연안동", "신흥동"],
    동구: ["만석동", "화수동", "송현동"],
    남구: ["주안동", "학익동", "용현동"],
  },
  광주: {
    동구: ["대인동", "계림동", "산수동"],
    서구: ["양동", "농성동", "화정동"],
    남구: ["백운동", "주월동", "월산동"],
  },
  대전: {
    유성구: ["궁동", "어은동", "신성동"],
    동구: ["중앙동", "신인동", "원동"],
    중구: ["대흥동", "문창동", "은행동"],
    서구: ["괴정동", "둔산동", "탄방동"],
  },
  울산: {
    중구: ["반구동", "학산동", "성남동"],
    남구: ["달동", "삼산동", "무거동"],
    동구: ["전하동", "남목동", "방어동"],
  },
  세종특별자치시: {
    조치원읍: ["조치원리", "장군면", "한솔동"],
    연기면: ["연기리", "연서면", "연동면"],
  },
  경기도: {
    수원시: ["권선구", "영통구", "장안구"],
    성남시: ["분당구", "수정구", "중원구"],
    고양시: ["덕양구", "일산동구", "일산서구"],
  },
  강원도: {
    삼척시: ["가곡면", "미로면", "신기면"],
    원주시: ["개운동", "명륜동", "단계동"],
    춘천시: ["남산면", "동면", "북산면"],
  },
  충청북도: {
    청주시: ["상당구", "서원구", "흥덕구"],
    충주시: ["주덕읍", "노은면", "앙성면"],
    제천시: ["신백동", "하소동", "영서동"],
  },
  충청남도: {
    천안시: ["동남구", "서북구"],
    공주시: ["반포면", "사곡면", "신관동"],
    보령시: ["대천동", "주포면", "웅천읍"],
  },
  전라북도: {
    전주시: ["완산구", "덕진구"],
    군산시: ["옥구읍", "옥산면", "회현면"],
    익산시: ["남중동", "마동", "동산동"],
  },
  전라남도: {
    목포시: ["용당동", "옥암동", "하당동"],
    여수시: ["돌산읍", "소라면", "여천동"],
    순천시: ["남내동", "매곡동", "풍덕동"],
  },
  경상북도: {
    포항시: ["남구", "북구"],
    경주시: ["중부동", "황성동", "선도동"],
    김천시: ["아포읍", "봉산면", "율곡동"],
  },
  경상남도: {
    창원시: ["의창구", "성산구", "마산합포구"],
    진주시: ["성북동", "상봉동", "평거동"],
    통영시: ["도남동", "명정동", "무전동"],
  },
  제주특별자치도: {
    제주시: ["한림읍", "애월읍", "구좌읍"],
    서귀포시: ["남원읍", "표선면", "성산읍"],
  },
};

const SurveyView = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [surveyResult, setSurveyResult] = useState([]);

  useEffect(() => {
    if (selectedRegion) {
      setCities(Object.keys(regions[selectedRegion]));
      setSelectedCity("");
      setSelectedDistrict("");
      setDistricts([]);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedCity) {
      setDistricts(regions[selectedRegion][selectedCity]);
      setSelectedDistrict("");
    }
  }, [selectedCity, selectedRegion]);

  const handleConfirm = async () => {
    try {
      const response = await axiosInstance.get(`/surveys`, {
        params: {
          sido: selectedRegion,
          sigungu: selectedCity,
          dong: selectedDistrict,
        },
      });
      setSurveyResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("수요조사 정보 가져오기 실패:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>지역 선택</h2>
      <div>
        <label>광역시/도: </label>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">선택하세요</option>
          {Object.keys(regions).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      {selectedRegion && (
        <div>
          <label>시군구: </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">선택하세요</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedCity && (
        <div>
          <label>읍면동: </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">선택하세요</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedDistrict && (
        <div>
          <label>선택된 지역: </label>
          <span>
            {selectedRegion} {selectedCity} {selectedDistrict}
          </span>
        </div>
      )}
      <button onClick={handleConfirm}>확인하기</button>
      {surveyResult.length > 0 && (
        <div>
          <h3>설문 결과:</h3>
          <ul>
            {surveyResult.map((result, index) => (
              <li key={index}>
                {result.storeType}: {result.surveyCount}명
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SurveyView;
