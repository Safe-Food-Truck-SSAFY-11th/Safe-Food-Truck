import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const onwerReplyAI = async () => {
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  var storeName = "[점포 이름]";
  var storeLocation = "[장사 위치]";
  var menu = [
      { name: "[메뉴 이름]", price: "[가격]", description: "[메뉴 설명]" }
  ];
  var operatingDays = ["월요일", "화요일", "수요일", "목요일"]; // 예시 요일
  var today = "화요일"; // 예시 요일
  
  // Positive review reply prompt
  var customerQuestionPositive = "음식이 정말 맛있었어요! 특히 타코야끼가 최고였어요. 다음에 또 방문할게요!";
  var prompt = `
  점포 이름: ${storeName}
  장사 위치: ${storeLocation}
  판매 메뉴: ${menu.map(item => `[${item.name}, ${item.price}, ${item.description}]`).join(", ")}
  장사 요일: ${operatingDays.join(", ")}
  오늘의 요일: ${today}
  
  고객의 질문: "${customerQuestionPositive}"
  
  이 정보를 기반으로 고객의 리뷰에 친절하게 답글 초안을 작성해줘.
  `;
  
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
}

export default onwerReplyAI;
