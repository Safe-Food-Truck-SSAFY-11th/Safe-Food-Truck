import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const onwerReplyAI = async (name, offDay, storeType, description, menuListResponseDto, reviewContent) => {

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

  var storeName = name;
  var menu = menuListResponseDto.menuResponseDtos;
  var operatingDays = getOperatingDays(offDay); // 예시 요일
  var today = getToday();

  var prompt = `
  점포 이름: ${storeName}
  점포 대표 메뉴 카테고리: ${storeType}
  점포 설명: ${description}
  판매 메뉴: ${menu.map(item => `[${item.name}, ${item.price}원, 설명: ${item.description}]`).join(", ")} 이외의 음식은 판매하지 않음
  영업 요일: ${operatingDays} (이외의 요일은 휴무)
  오늘의 요일: ${today}
  
  고객의 리뷰: "${reviewContent}"
  
  이 정보를 기반으로 고객의 리뷰에 친절하게 답글 초안을 작성해줘.
  `;
  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
}

export default onwerReplyAI;
