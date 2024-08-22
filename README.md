# README.md

# 🛻 Safe Food Truck 세이푸트

---

```
💡 손 안에서 확인하는 안전한 푸드트럭 서비스
```


### SSAFY 11기 공통 프로젝트

## 프로젝트 진행 기간

### 2024.07.08~2024.08.16 (6주)

## 팀원 소개

![image](https://github.com/user-attachments/assets/bec65517-51c7-4d45-a17d-8dbe609e2375)

- 박창호 `팀장`, `Backend`
    - JPA, QueryDSL을 활용한 쿼리 작성 및 성능 최적화
    - MySQL, Redis 등 DB관리
    - 점포, 주문, 메뉴, 리뷰 API 설계
    - 노션 및 Jira 일정 관리
- 장준석 `Backend`
    - Spring Security와 JWT를 활용하여 인증 및 인가 구현
    - 소셜 로그인 구현(OAuth)
    - SSE를 활용한 알림 구현
    - 회원, 찜, 알림, 스케줄 API 설계
- 조용훈 `Infra`
    - EC2, Docker, Jenkins, Ngnix 이용한 CI/CD pipeline 구축
    - gemini API, karlo API를 활용한 AI 기능(챗봇, 로고 제작) 개발
- 정다운 `Frontend`
    - 디자인 총괄
    - 회원, 사장 UI/UX 및 기능 구현
    - 소셜 로그인 (Kakao, Google) 구현
- 김준혁 `Frontend`
    - 점포, 손님 UI/UX 및 기능 구현
    - 컴포넌트 구조 설계
    - Kakao map API를 이용한 위치 정보 조회 및 지도 조회 최적화
- 이윤주 `Frontend`
    - 푸드트럭 허가구역, 수요조사 및 채팅 UI/UX 구현
    - openVidu를 활용한 실시간 방송 및 채팅 구현
    - API 비동기 처리, 테스팅 최적화

## 기획 배경

- 시장동향 및 기획 배경
    - 식품의약품안전처의 조사에 따르면 전국 푸드트럭은 2024년 현재 약 3000에 다다르고 있다.
    - 서울공공데이터에서 서울, 경기 지역의 푸드트럭 폐업률은 각각 53.5%, 43.2%로 높은 폐업률을 보이고 있다.
    - 서울공공데이터에서 푸드트럭 허가구역 운영 상황 조사 결과에 따르면 운영중인 허가구역은 154곳, 운영 종료인 허가구역은 194 곳으로 푸드트럭 허가구역 운영에 어려움이 있다.
- 불편 및 요구사항
    - 사업자 : 푸드트럭 운영에 있어 어려운 점으로 48.8%가 ‘규제로 인한 이동성 제한’을 이유라고 답했으며, 한국푸드트럭협회장은 “지자체의 영업가능 장소 공고 시 알림받을 시스템만으로도 큰 개선”을 할 수 있을 것이라 언급했다.
    - 소비자 : 푸드트럭 소비자는 25세 이상 44세 이하가 43.4%로 가장 많은 비중을 차지하고 있고, 합법적 푸드트럭 이용의향 조사 결과에서 67.2%가 이용의사가 있다고 답했다.
    - 지자체 : 푸드트럭 등 소상공인 규제개선에 앞장서고 있다는 보도자료와 푸드트럭 및 음식점이 식품위생법을 위반하는 문제점이 있다.

## 기대 효과

### 청년 창업 지원

- 남녀 구직자 1970명 대상 조사 결과에 따르면 고려했던 창업 아이템으로 음식점/푸드트럭을 17.8%가 꼽고 있다. 본 서비스를 통해 푸드트럭의 홍보 효과를 기대할 수 있다.

### 지자체 협업

- 지자체와 협업하여 소상공인을 지원하고, 푸드트럭 관리에 본 서비스를 이용할 수 있다.

### 비즈니스 모델

- 멤버십 기능을 도입하여 창업 광고, 구독/후원 시스템 및 푸드트럭 운영의 체계적 관리를 제공하는 비즈니스 모델로 확장이 가능하다.

# 시스템 아키텍쳐

![image](https://github.com/user-attachments/assets/ec101a5b-fb9c-4946-9442-b91ca5bce260)

# 플로우 차트

- 로그인
![image](https://github.com/user-attachments/assets/03930f47-0d61-474d-9130-f3dd842a64eb)
    
- 사장님(사업자)
![image](https://github.com/user-attachments/assets/d1ceab0e-1862-4e3c-8f05-e6462842d355)
    
- 손님(소비자)
![image](https://github.com/user-attachments/assets/e9e203b3-e11e-41a7-9c84-1f290808ffe0)
    

# 화면 설계서

![image](https://github.com/user-attachments/assets/2b3dbec1-ffd9-40d5-abff-3004cfe76085)

# ERD

![image](https://github.com/user-attachments/assets/18ec2aa1-6c34-4628-95b4-ef579ee1f0ec)

# API 명세서

- [API 명세서 링크](https://www.notion.so/API-6d002e3b7e24495db93f66389fc317ad?pvs=21)

![api명세서](https://github.com/user-attachments/assets/054bfba6-94df-4308-8b8a-24c51cc5dcc3)

# 주요 기능 및 서비스 화면

## 로그인 화면

- 유저의 역할(손님/사장님) 구분하여 로그인 유도

![로그인화면](https://github.com/user-attachments/assets/59b62008-293b-4698-9b50-1fc916edf5af)

- 아이디 및 비밀번호 찾기 제공

![아이디 찾기](https://github.com/user-attachments/assets/63966acf-205d-4b70-aa75-24ca343166d7)

![비밀번호 찾기](https://github.com/user-attachments/assets/139886c4-34d3-43cd-9f85-b3dd0aa3cc87)

![image](https://github.com/user-attachments/assets/a1f178a6-fe9c-4917-8fab-1cba2e99b063)

## 회원가입

- 이메일, 비밀번호 유효성 검사
- 이메일, 닉네임, 전화번호 중복확인

![손님 회원가입](https://github.com/user-attachments/assets/d39c0a09-15d5-42db-bf33-1a50d6107214)

- (사장님) 사업자등록정보 진위확인 및 상태조회 API

![사장 회원가입](https://github.com/user-attachments/assets/9dccde18-3bcc-44fc-a140-ecbaa5435e1a)

## 점포등록

- 푸드트럭지정현황조회 API

![푸드트럭등록](https://github.com/user-attachments/assets/36e2970e-500b-4b83-93c9-f6d8119f0d53)

## 소셜 로그인

- 카카오 및 구글 소셜 로그인 제공

![카카오 로그인](https://github.com/user-attachments/assets/704d7f79-45e7-4b69-be75-62a92399c034)

![소셜로그인](https://github.com/user-attachments/assets/9adf5783-d54f-48f2-9fc9-c4895d85b359)

## 멤버십

- Spring Security
- (사장님) AI 리뷰 초안 작성, AI 점포 이미지 생성 기능 제공

## 허가구역 확인 (사장님)

- 카카오맵
- 전국 푸드트럭 허가구역 표준데이터 사용

## 메인화면 (손님)

- 현재 라이브 방송 중인 푸드트럭 확인 및 클릭하여 방송 시청 가능
- 사용자의 현재 위치를 중심으로 지도 조회 및 목록 조회
- 푸드트럭의 카테고리로 필터링하여 조회

![방송리스트및접속](https://github.com/user-attachments/assets/5f791c8c-1f94-49b6-9feb-1fb71a2b3e2d)

![위치확인및점포상세조회](https://github.com/user-attachments/assets/e52986fc-be5c-4eb0-b051-acb19520e737)

![점포위치및목록지도보기](https://github.com/user-attachments/assets/b2a3ecff-59bf-4a23-a28f-6f85ac12968e)

## 주문 및 장바구니 기능 (손님)

![장바구니및주문하기](https://github.com/user-attachments/assets/64e1191b-c2d0-48e1-921d-e116a63fe39e)

## 주문 실시간 알림 기능 (손님)

![주문 수락, 완료](https://github.com/user-attachments/assets/f9809dd3-a1c8-4304-8db9-d46268e70ccf)

## 메인화면 (사장님)

- 영업 상태 변경, 방송 시작 및 종료 가능
- 실시간 주문 확인

### 주문 확인

![실시간 주문 접수](https://github.com/user-attachments/assets/c252289c-4884-4c6e-b05b-7bd1ff74a3e7)

## 리뷰 작성 기능 (손님)

- 픽업 완료된 주문에 대해서 리뷰 작성 가능
- 리뷰 사진, 별점, 리뷰 내용 작성 가능
- 다중 파일 업로드 (AWS S3)

![리뷰작성(손님)](https://github.com/user-attachments/assets/5179d52e-c8ce-4317-8bad-3da25bfd919e)

## 푸드트럭 라이브 방송 기능 (사장님)

- openVidu를 사용한 실시간 라이브 방송 및 채팅
- 공지사항 기능

![사장님방송시작](https://github.com/user-attachments/assets/fbea393d-344a-4df2-ae5c-ff0cae45b90b)

## 라이브 방송 알림 기능 (손님)

- SSE 알림을 통해 찜한 푸드트럭 방송 시작 알림
- 알림에 있는 버튼을 통해 라이브 방송 바로 시청 가능

![방송시작 알림 및 링크 접속](https://github.com/user-attachments/assets/007f65db-15ec-46bd-a739-7f3ee58229bb)

## 라이브 방송 AI 챗봇 “푸디”

- gemini AI

![AI챗봇푸디사용](https://github.com/user-attachments/assets/625dd246-3421-49a9-885d-4d7fed0a6cd4)

## 소비패턴 분석 (손님)

- chart.js
- 주간 소비 금액, 주문 횟수

![소비패턴분석](https://github.com/user-attachments/assets/f4496470-34b0-49f2-a255-88ea5c3b4cda)

## 수요조사 제출 (손님)

- 손님이 지정한 위치를 기반으로 수요조사 정보 제출
- 주 1회 횟수제한

![수요조사](https://github.com/user-attachments/assets/474257ab-c52a-41df-8ec4-3e631fcf6c7b)

## 점포 상세페이지

- 메뉴 목록 확인
- 점포 스케줄, 통계(리뷰, 찜 개수) 확인
- 리뷰 확인, 신고 기능

![점포상세조회](https://github.com/user-attachments/assets/45147b61-1d40-4b57-95e5-11dc8b5345ea)

## 마이페이지 (사장님)

### 리뷰 답글 및 AI 답글 초안 기능 (사장님)

- gemini AI를 사용한 리뷰 답글 초안 작성

![AI사장님답글초안](https://github.com/user-attachments/assets/d4efdd36-9368-46e0-83c5-ab2a16a8337f)

### 수요조사 확인 (사장님)

- nivo chart 사용
- 수요조사가 제출된 지역을 기반으로 조회 가능

![수요조사 헤더부착](https://github.com/user-attachments/assets/f98d8db6-ea6b-42dd-abdd-3d85a462e408)

### AI 로고 생성 (사장님)

- karlo

![AI로고 생성](https://github.com/user-attachments/assets/f264a52c-04de-4a9a-aa04-cccc5eff48ac)

### 매출 분석 (사장님)

- chart.js
- 일간, 주간 매출 및 메뉴 판매량

![사장님매출통계헤더부착](https://github.com/user-attachments/assets/3e5e30aa-47a5-4493-b6c1-c05ded69f80b)

### 스케줄 관리

- 카카오 맵
- 요일별 방문 장소 관리

![스케줄관리](https://github.com/user-attachments/assets/de57aeb8-9498-48c1-8ea7-566f76cb4343)

# Jira 보고서

### 1주차

![image](https://github.com/user-attachments/assets/e5284053-de03-4bd2-b926-3f611ef05a8d)

### 2주차

![image](https://github.com/user-attachments/assets/89724a99-9714-4984-a5b8-b7516edfdac7)

### 3주차

![image](https://github.com/user-attachments/assets/093562d1-d728-4f81-a495-6822fc07e87d)

### 4주차

![image](https://github.com/user-attachments/assets/1dfda292-2f45-4fd6-bf45-2c974bc1d6d1)

### 5주차

![image (1)](https://github.com/user-attachments/assets/d6bbe575-a10a-4fa9-be6f-797dd8a2ce50)
