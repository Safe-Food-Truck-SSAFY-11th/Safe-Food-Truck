# 🛻 Safe Food Truck 세이푸트

---

<aside>
💡 **손 안에서 확인하는 안전한 푸드트럭 서비스**

</aside>

### SSAFY 11기 공통 프로젝트

## 프로젝트 진행 기간

### 2024.07.08~2024.08.16 (6주)

## 팀원 소개

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/d67694e8-9c26-4f04-803c-5b81376161fd/image.png)

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

![단락 텍스트.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/074dd09b-2ce1-4a4e-8888-a2fce4653e95/%EB%8B%A8%EB%9D%BD_%ED%85%8D%EC%8A%A4%ED%8A%B8.png)

# 플로우 차트

- 로그인
    
    ![제목 없는 디자인.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/731674ff-628c-42e9-8ca4-7f7200ee9f18/%EC%A0%9C%EB%AA%A9_%EC%97%86%EB%8A%94_%EB%94%94%EC%9E%90%EC%9D%B8.png)
    
- 사장님(사업자)
    
    ![단락 텍스트 (1).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/11d0ef7b-6d36-4f3f-a5ba-50b419499485/%EB%8B%A8%EB%9D%BD_%ED%85%8D%EC%8A%A4%ED%8A%B8_(1).png)
    
- 손님(소비자)
    
    ![단락 텍스트 (2).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/91c5e4ad-9a72-4909-86c2-6f05dd6f5d3e/%EB%8B%A8%EB%9D%BD_%ED%85%8D%EC%8A%A4%ED%8A%B8_(2).png)
    

# 화면 설계서

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/074f5a6a-041c-4324-a4a6-c92cac0601e0/image.png)

# ERD

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/650f5ded-6035-4b5c-8b39-f33804c3c075/image.png)

# API 명세서

- [API 명세서 링크](https://www.notion.so/API-6d002e3b7e24495db93f66389fc317ad?pvs=21)

![api명세서.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/74bb141b-d66c-4817-bd46-72bc98c64084/api%EB%AA%85%EC%84%B8%EC%84%9C.gif)

# 주요 기능 및 서비스 화면

## 로그인 화면

- 유저의 역할(손님/사장님) 구분하여 로그인 유도

![로그인화면.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/09ad7d6d-1854-40fa-8a7d-42878b7d1b8a/%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%99%94%EB%A9%B4.gif)

- 아이디 및 비밀번호 찾기 제공

![아이디 찾기.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/1e1878e1-bf0a-431e-8fde-950eba545689/%EC%95%84%EC%9D%B4%EB%94%94_%EC%B0%BE%EA%B8%B0.gif)

![비밀번호 찾기.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/a1ec689a-8fd7-40d8-972c-7297e45f97f7/%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8_%EC%B0%BE%EA%B8%B0.gif)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/ee529aea-4a33-4ab1-891c-9d8789e8bf07/image.png)

## 회원가입

- 이메일, 비밀번호 유효성 검사
- 이메일, 닉네임, 전화번호 중복확인

![손님 회원가입.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/5ba3ec89-ac2f-4856-a78e-899eb6e47250/%EC%86%90%EB%8B%98_%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.gif)

- (사장님) 사업자등록정보 진위확인 및 상태조회 API

![사장 회원가입.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/520bb0ff-77ed-45ac-b0e2-a38b8b24c5ee/%EC%82%AC%EC%9E%A5_%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.gif)

## 점포등록

- 푸드트럭지정현황조회 API

![푸드트럭등록.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/879d07d1-2b2e-4e23-9361-665872c78805/%ED%91%B8%EB%93%9C%ED%8A%B8%EB%9F%AD%EB%93%B1%EB%A1%9D.gif)

## 소셜 로그인

- 카카오 및 구글 소셜 로그인 제공

![카카오 로그인.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/b4c388d2-969a-4dda-8e86-12452710134f/%EC%B9%B4%EC%B9%B4%EC%98%A4_%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif)

![소셜로그인.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/6e2ca082-c129-4e2c-8ec1-1e94652e35ef/%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif)

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

![방송리스트및접속.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/c430ecf9-6e4e-4afe-b5af-08cf3c84506f/%EB%B0%A9%EC%86%A1%EB%A6%AC%EC%8A%A4%ED%8A%B8%EB%B0%8F%EC%A0%91%EC%86%8D.gif)

![위치확인및점포상세조회.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/08981e03-c48d-4355-abfb-0baeb6dbcb5b/%EC%9C%84%EC%B9%98%ED%99%95%EC%9D%B8%EB%B0%8F%EC%A0%90%ED%8F%AC%EC%83%81%EC%84%B8%EC%A1%B0%ED%9A%8C.gif)

![점포위치및목록지도보기.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/e3f6bd63-d8d3-4a76-8f57-ccaf7c898301/%EC%A0%90%ED%8F%AC%EC%9C%84%EC%B9%98%EB%B0%8F%EB%AA%A9%EB%A1%9D%EC%A7%80%EB%8F%84%EB%B3%B4%EA%B8%B0.gif)

## 주문 및 장바구니 기능 (손님)

![장바구니및주문하기.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/140ec040-0bdf-4747-9c8e-f9029109c367/%EC%9E%A5%EB%B0%94%EA%B5%AC%EB%8B%88%EB%B0%8F%EC%A3%BC%EB%AC%B8%ED%95%98%EA%B8%B0.gif)

## 주문 실시간 알림 기능 (손님)

![주문 수락, 완료.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/9968de1d-dd5e-43f5-8024-8faab97f3fde/%E1%84%8C%E1%85%AE%E1%84%86%E1%85%AE%E1%86%AB_%E1%84%89%E1%85%AE%E1%84%85%E1%85%A1%E1%86%A8_%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%85%E1%85%AD.gif)

## 메인화면 (사장님)

- 영업 상태 변경, 방송 시작 및 종료 가능
- 실시간 주문 확인

### 주문 확인

![실시간 주문 접수.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/c3a5feb5-a9b5-4820-aa24-e939ca5e1aec/%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B5%E1%84%80%E1%85%A1%E1%86%AB_%E1%84%8C%E1%85%AE%E1%84%86%E1%85%AE%E1%86%AB_%E1%84%8C%E1%85%A5%E1%86%B8%E1%84%89%E1%85%AE.gif)

## 리뷰 작성 기능 (손님)

- 픽업 완료된 주문에 대해서 리뷰 작성 가능
- 리뷰 사진, 별점, 리뷰 내용 작성 가능
- 다중 파일 업로드 (AWS S3)

![리뷰작성(손님).gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/9c373ea8-fdde-4702-ae45-4eb2decfe2e2/%EB%A6%AC%EB%B7%B0%EC%9E%91%EC%84%B1(%EC%86%90%EB%8B%98).gif)

## 푸드트럭 라이브 방송 기능 (사장님)

- openVidu를 사용한 실시간 라이브 방송 및 채팅
- 공지사항 기능

![사장님방송시작.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/29d84629-338d-458b-b74d-36648ea7fb83/%EC%82%AC%EC%9E%A5%EB%8B%98%EB%B0%A9%EC%86%A1%EC%8B%9C%EC%9E%91.gif)

## 라이브 방송 알림 기능 (손님)

- SSE 알림을 통해 찜한 푸드트럭 방송 시작 알림
- 알림에 있는 버튼을 통해 라이브 방송 바로 시청 가능

![방송시작 알림 및 링크 접속.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/87a7fde4-f86e-4bdd-b6fe-2cf79e4ace0f/%EB%B0%A9%EC%86%A1%EC%8B%9C%EC%9E%91_%EC%95%8C%EB%A6%BC_%EB%B0%8F_%EB%A7%81%ED%81%AC_%EC%A0%91%EC%86%8D.gif)

## 라이브 방송 AI 챗봇 “푸디”

- gemini AI

![AI챗봇푸디사용.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/86e75cd7-7969-40f8-b0cd-44a84706b181/AI%EC%B1%97%EB%B4%87%ED%91%B8%EB%94%94%EC%82%AC%EC%9A%A9.gif)

## 소비패턴 분석 (손님)

- chart.js
- 주간 소비 금액, 주문 횟수

![소비패턴분석.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/8b7e9615-dcb6-41eb-ad59-9eb44e0d455c/%EC%86%8C%EB%B9%84%ED%8C%A8%ED%84%B4%EB%B6%84%EC%84%9D.gif)

## 수요조사 제출 (손님)

- 손님이 지정한 위치를 기반으로 수요조사 정보 제출
- 주 1회 횟수제한

![수요조사.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/2bbe93f3-c86c-4db9-80a9-67f52a17d812/%EC%88%98%EC%9A%94%EC%A1%B0%EC%82%AC.gif)

## 점포 상세페이지

- 메뉴 목록 확인
- 점포 스케줄, 통계(리뷰, 찜 개수) 확인
- 리뷰 확인, 신고 기능

![점포상세조회.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/6ce932b0-c4a1-4552-9c7b-a65f3b18c572/%EC%A0%90%ED%8F%AC%EC%83%81%EC%84%B8%EC%A1%B0%ED%9A%8C.gif)

## 마이페이지 (사장님)

### 리뷰 답글 및 AI 답글 초안 기능 (사장님)

- gemini AI를 사용한 리뷰 답글 초안 작성

![AI사장님답글초안.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/7f515f6d-0e4e-4487-a865-8bd83fcdd4d6/AI%EC%82%AC%EC%9E%A5%EB%8B%98%EB%8B%B5%EA%B8%80%EC%B4%88%EC%95%88.gif)

### 수요조사 확인 (사장님)

- nivo chart 사용
- 수요조사가 제출된 지역을 기반으로 조회 가능

![수요조사 헤더부착.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/6475cb83-4c2c-49cd-936c-f7d5966ffe33/%EC%88%98%EC%9A%94%EC%A1%B0%EC%82%AC_%ED%97%A4%EB%8D%94%EB%B6%80%EC%B0%A9.gif)

### AI 로고 생성 (사장님)

- karlo

![AI로고 생성.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/6d2b4807-3ab9-4e81-b69e-d7db95234a88/AI%EB%A1%9C%EA%B3%A0_%EC%83%9D%EC%84%B1.gif)

### 매출 분석 (사장님)

- chart.js
- 일간, 주간 매출 및 메뉴 판매량

![사장님매출통계헤더부착.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/d7f4da7c-46b7-44fa-8fe4-1be5e9a17f5e/%EC%82%AC%EC%9E%A5%EB%8B%98%EB%A7%A4%EC%B6%9C%ED%86%B5%EA%B3%84%ED%97%A4%EB%8D%94%EB%B6%80%EC%B0%A9.gif)

### 스케줄 관리

- 카카오 맵
- 요일별 방문 장소 관리

![스케줄관리.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/ea9785ed-e910-4a02-bc18-06f4f4b25893/%EC%8A%A4%EC%BC%80%EC%A4%84%EA%B4%80%EB%A6%AC.gif)

# Jira 보고서

### 1주차

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/5e763b39-ead1-4545-add0-7048fb1cd5ea/image.png)

### 2주차

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/d397a317-6a5f-4bde-85a8-3eb1df51e533/image.png)

### 3주차

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/f9bdbd2a-83a3-4372-84e8-3812dec23296/image.png)

### 4주차

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/427a464d-ebe5-4880-b1c0-c3c9760123a2/image.png)

### 5주차

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/cc17ccdb-24cc-4111-8189-0f1d7518f822/b2f52812-3d8f-4d95-97af-af035bb43200/image.png)
