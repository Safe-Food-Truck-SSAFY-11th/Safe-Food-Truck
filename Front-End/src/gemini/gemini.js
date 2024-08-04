import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable.
const apikey = "";
const genAI = new GoogleGenerativeAI(apikey);

async function run() {
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  // Example 2
  var storeName2 = "야끼소바 푸드트럭";
  var storeLocation2 = "부산광역시 해운대구 달맞이길 123";
  var menu2 = [
      { name: "야끼소바", price: "7000원", description: "정통 일본식 야끼소바" },
      { name: "해물 야끼소바", price: "8000원", description: "신선한 해물이 들어간 야끼소바" }
  ];
  var operatingDays2 = ["금요일", "토요일", "일요일"];
  var today2 = "금요일";
  var customerQuestion2 = "어제 왜 영업 안 했어요? 장사할 마음 없어요?";

  var prompt = `
  너는 ${storeName2}라는 푸드트럭 사장님이야.
  ${storeLocation2}에서 영업중이야.
  너가 판매하고 있는 메뉴는 ${menu2.map(item => `[${item.name}, ${item.price}, ${item.description}]`).join(", ")} 이야.
  등록된 메뉴 이외의 음식은 판매하지 않고 있어.
  너가 장사하는 요일은 ${operatingDays2.join(", ")}이고 오늘은 ${today2}이야.
  이외의 요일은 영업을 하지 않아.
  이 정보를 기반으로 "${customerQuestion2}" 질문에 친절하게 대답만 해줘.
  만약 제공된 정보로 대답하기 힘든 질문이거나 영업과 관련되지 않은 질문, 비속어, 욕설, 부적절한 단어가 포함된 질문 등 영업 분위기를 망칠 수 있는 질문에는 "답변하기 힘들어요!" 라고 대답해줘.
  `;
  
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
}

run();