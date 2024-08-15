import { GoogleGenerativeAI } from "@google/generative-ai";
import axiosInstance from "utils/axiosInstance";

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const chatbot = async (storeId, questionContent) => {

  const rs = await axiosInstance.get(`/stores/${storeId}`);
  const storeInfo = rs.data;
  // console.log("내부 로직에서 불러온 트럭 정보", storeInfo)
  const getToday = () => {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const today = new Date();
    return days[today.getDay()];
  };
  
  const getOperatingDays = (offDay) => {
    const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
    return offDay
      .split('') // 문자열을 배열로 변환
      .map((day, index) => (day === '1' ? days[index] : null))
      .filter(day => day !== null);
  };

  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  var menu = storeInfo.menuListResponseDto.menuResponseDtos;
  var operatingDays = getOperatingDays(storeInfo.offDay); // 예시 요일
  var today = getToday();
  var prompt = `
  점포 이름: ${storeInfo.name}
  점포 대표 메뉴 카테고리: ${storeInfo.storeType}
  점포 설명: ${storeInfo.description}
  판매 메뉴: ${menu.map(item => `[${item.name}, ${item.price}원, 설명: ${item.description}]`).join(", ")} 이외의 음식은 판매하지 않음
  영업 요일: ${operatingDays} (이외의 요일은 휴무)
  오늘의 요일: ${today}
  
  고객의 질문: "${questionContent}"
  
  이 정보를 기반으로 실시간 영업 방송을 시청중인 고객의 질문에 친절하게 한국말로 답변 해줘
  만약 대답하기 어려운 질문이거나 알 수 없는 내용의 질문이라면 '사장님께 직접 물어봐야 할것 같아요!' 라고 답변해줘 그리고 답변에 마크다운 문법을 적용하지 말아줘.
  `;
  // console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  // console.log(text);
  return text;
}

export default chatbot;
