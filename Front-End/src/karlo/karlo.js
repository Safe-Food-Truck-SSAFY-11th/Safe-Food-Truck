// 필요한 모듈을 import
import fetch from 'node-fetch';
import { createCanvas, Image } from 'canvas';
import fs from 'fs';

// REST API 키
const REST_API_KEY = '';

// 이미지 생성 API를 호출하는 함수
async function t2i(prompt, negative_prompt) {
    // API 요청을 보냄
    const response = await fetch('https://api.kakaobrain.com/v2/inference/karlo/t2i', {
        method: 'POST',
        headers: {
            'Authorization': `KakaoAK ${REST_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            version: 'v2.1',
            prompt: prompt,
            negative_prompt: negative_prompt,
            height: 1024,
            width: 1024
        })
    });

    // 응답 데이터를 JSON 형식으로 파싱
    const data = await response.json();
    return data;
}

// 이미지를 다운로드하여 파일로 저장하는 함수
async function downloadImage(url, filepath) {
    // 이미지 URL에서 데이터를 가져옴
    const response = await fetch(url);
    // 데이터를 arrayBuffer로 변환
    const buffer = await response.arrayBuffer();
    // buffer 데이터를 파일로 씀
    fs.writeFileSync(filepath, Buffer.from(buffer));
}

const storeName1 = "happyBuger";
const location1 = "서울특별시 강남구 역삼동 123-45";
const menuItems1 = [
  { name: "치즈버거", price: "5,000원", description: "고소한 치즈와 신선한 야채가 들어간 버거" },
  { name: "감자튀김", price: "2,000원", description: "바삭바삭한 감자튀김" }
];

const logoStyle1 = "colorful and modern"; // 로고 스타일
const logoElements1 = "a burger and fries"; // 로고에 포함될 요소
const designFeel1 = "fun and inviting design"; // 디자인 느낌

const prompt = `
You are the owner of a food truck called ${storeName1}. You are operating at ${location1}. The menu items you are selling are ${menuItems1.map(item => `[ ${item.name}, ${item.price}, ${item.description} ]`).join(', ')}. You need a logo that represents your store. The logo should be ${logoStyle1}, include elements like ${logoElements1}, with a ${designFeel1}. Please create a logo for it.
`;


// 이미지를 생성하기 위한 프롬프트
const prompt2 = 'A photo of a cute tiny monster on the beach, daylight.';
const negative_prompt = '';

// API를 호출하고 응답을 처리
t2i(prompt, negative_prompt).then(async (response) => {
    // 응답에서 첫 번째 이미지 URL을 가져옴
    const imageUrl = response.images[0].image;
    const imagePath = './result.png';

    // 이미지를 다운로드하여 로컬 파일로 저장
    await downloadImage(imageUrl, imagePath);

    // canvas와 이미지를 생성
    const canvas = createCanvas(1024, 1024);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // 이미지 로드가 완료되면 캔버스에 그리기
    img.onload = () => {
        ctx.drawImage(img, 0, 0, 1024, 1024);
        
        // 캔버스 내용을 새로운 이미지 파일로 저장
        const out = fs.createWriteStream('./canvas_result.png');
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => console.log('The image was created and saved as canvas_result.png'));
    };
    
    // 이미지 파일을 읽어서 img.src에 설정
    img.src = fs.readFileSync(imagePath);
}).catch(error => {
    // 에러 발생 시 콘솔에 출력
    console.error('Error:', error);
});