# README.md

# 🛻 Safe Food Truck 세이푸트

---

<aside>
💡 **손 안에서 확인하는 안전한 푸드트럭 서비스**

</aside>

### SSAFY 11기 공통 프로젝트

## 프로젝트 진행 기간

### 2024.07.08~2024.08.16 (6주)

## 팀원 소개

![image.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/image.png)

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

![단락 텍스트.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EB%258B%25A8%25EB%259D%25BD_%25ED%2585%258D%25EC%258A%25A4%25ED%258A%25B8.png)

# 플로우 차트

- 로그인
    
    ![제목 없는 디자인.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%25A0%259C%25EB%25AA%25A9_%25EC%2597%2586%25EB%258A%2594_%25EB%2594%2594%25EC%259E%2590%25EC%259D%25B8.png)
    
- 사장님(사업자)
    
    ![단락 텍스트 (1).png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EB%258B%25A8%25EB%259D%25BD_%25ED%2585%258D%25EC%258A%25A4%25ED%258A%25B8_(1).png)
    
- 손님(소비자)
    
    ![단락 텍스트 (2).png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EB%258B%25A8%25EB%259D%25BD_%25ED%2585%258D%25EC%258A%25A4%25ED%258A%25B8_(2).png)
    

# 화면 설계서

![image.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/image%201.png)

# ERD

![image.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/image%202.png)

# API 명세서

- [API 명세서 링크](https://www.notion.so/API-6d002e3b7e24495db93f66389fc317ad?pvs=21)

![api명세서.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/api%25EB%25AA%2585%25EC%2584%25B8%25EC%2584%259C.gif)

# 주요 기능 및 서비스 화면

## 로그인 화면

- 유저의 역할(손님/사장님) 구분하여 로그인 유도

![로그인화면.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EB%25A1%259C%25EA%25B7%25B8%25EC%259D%25B8%25ED%2599%2594%25EB%25A9%25B4.gif)

- 아이디 및 비밀번호 찾기 제공

![아이디 찾기.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%2595%2584%25EC%259D%25B4%25EB%2594%2594_%25EC%25B0%25BE%25EA%25B8%25B0.gif)

![비밀번호 찾기.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EB%25B9%2584%25EB%25B0%2580%25EB%25B2%2588%25ED%2598%25B8_%25EC%25B0%25BE%25EA%25B8%25B0.gif)

![image.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/image%203.png)

## 회원가입

- 이메일, 비밀번호 유효성 검사
- 이메일, 닉네임, 전화번호 중복확인

![손님 회원가입.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%2586%2590%25EB%258B%2598_%25ED%259A%258C%25EC%259B%2590%25EA%25B0%2580%25EC%259E%2585.gif)

- (사장님) 사업자등록정보 진위확인 및 상태조회 API

![사장 회원가입.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%2582%25AC%25EC%259E%25A5_%25ED%259A%258C%25EC%259B%2590%25EA%25B0%2580%25EC%259E%2585.gif)

## 점포등록

- 푸드트럭지정현황조회 API

![푸드트럭등록.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25ED%2591%25B8%25EB%2593%259C%25ED%258A%25B8%25EB%259F%25AD%25EB%2593%25B1%25EB%25A1%259D.gif)

## 소셜 로그인

- 카카오 및 구글 소셜 로그인 제공

![카카오 로그인.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%25B9%25B4%25EC%25B9%25B4%25EC%2598%25A4_%25EB%25A1%259C%25EA%25B7%25B8%25EC%259D%25B8.gif)

![소셜로그인.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%2586%258C%25EC%2585%259C%25EB%25A1%259C%25EA%25B7%25B8%25EC%259D%25B8.gif)

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

![방송리스트및접속.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EB%25B0%25A9%25EC%2586%25A1%25EB%25A6%25AC%25EC%258A%25A4%25ED%258A%25B8%25EB%25B0%258F%25EC%25A0%2591%25EC%2586%258D.gif)

![위치확인및점포상세조회.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%259C%2584%25EC%25B9%2598%25ED%2599%2595%25EC%259D%25B8%25EB%25B0%258F%25EC%25A0%2590%25ED%258F%25AC%25EC%2583%2581%25EC%2584%25B8%25EC%25A1%25B0%25ED%259A%258C.gif)

![점포위치및목록지도보기.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%25A0%2590%25ED%258F%25AC%25EC%259C%2584%25EC%25B9%2598%25EB%25B0%258F%25EB%25AA%25A9%25EB%25A1%259D%25EC%25A7%2580%25EB%258F%2584%25EB%25B3%25B4%25EA%25B8%25B0.gif)

## 주문 및 장바구니 기능 (손님)

![장바구니및주문하기.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%259E%25A5%25EB%25B0%2594%25EA%25B5%25AC%25EB%258B%2588%25EB%25B0%258F%25EC%25A3%25BC%25EB%25AC%25B8%25ED%2595%2598%25EA%25B8%25B0.gif)

## 주문 실시간 알림 기능 (손님)

![주문 수락, 완료.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25E1%2584%258C%25E1%2585%25AE%25E1%2584%2586%25E1%2585%25AE%25E1%2586%25AB_%25E1%2584%2589%25E1%2585%25AE%25E1%2584%2585%25E1%2585%25A1%25E1%2586%25A8_%25E1%2584%258B%25E1%2585%25AA%25E1%2586%25AB%25E1%2584%2585%25E1%2585%25AD.gif)

## 메인화면 (사장님)

- 영업 상태 변경, 방송 시작 및 종료 가능
- 실시간 주문 확인

### 주문 확인

![실시간 주문 접수.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25E1%2584%2589%25E1%2585%25B5%25E1%2586%25AF%25E1%2584%2589%25E1%2585%25B5%25E1%2584%2580%25E1%2585%25A1%25E1%2586%25AB_%25E1%2584%258C%25E1%2585%25AE%25E1%2584%2586%25E1%2585%25AE%25E1%2586%25AB_%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25B8%25E1%2584%2589%25E1%2585%25AE.gif)

## 리뷰 작성 기능 (손님)

- 픽업 완료된 주문에 대해서 리뷰 작성 가능
- 리뷰 사진, 별점, 리뷰 내용 작성 가능
- 다중 파일 업로드 (AWS S3)

![리뷰작성(손님).gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EB%25A6%25AC%25EB%25B7%25B0%25EC%259E%2591%25EC%2584%25B1(%25EC%2586%2590%25EB%258B%2598).gif)

## 푸드트럭 라이브 방송 기능 (사장님)

- openVidu를 사용한 실시간 라이브 방송 및 채팅
- 공지사항 기능

![사장님방송시작.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%2582%25AC%25EC%259E%25A5%25EB%258B%2598%25EB%25B0%25A9%25EC%2586%25A1%25EC%258B%259C%25EC%259E%2591.gif)

## 라이브 방송 알림 기능 (손님)

- SSE 알림을 통해 찜한 푸드트럭 방송 시작 알림
- 알림에 있는 버튼을 통해 라이브 방송 바로 시청 가능

![방송시작 알림 및 링크 접속.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EB%25B0%25A9%25EC%2586%25A1%25EC%258B%259C%25EC%259E%2591_%25EC%2595%258C%25EB%25A6%25BC_%25EB%25B0%258F_%25EB%25A7%2581%25ED%2581%25AC_%25EC%25A0%2591%25EC%2586%258D.gif)

## 라이브 방송 AI 챗봇 “푸디”

- gemini AI

![AI챗봇푸디사용.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/AI%25EC%25B1%2597%25EB%25B4%2587%25ED%2591%25B8%25EB%2594%2594%25EC%2582%25AC%25EC%259A%25A9.gif)

## 소비패턴 분석 (손님)

- chart.js
- 주간 소비 금액, 주문 횟수

![소비패턴분석.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%2586%258C%25EB%25B9%2584%25ED%258C%25A8%25ED%2584%25B4%25EB%25B6%2584%25EC%2584%259D.gif)

## 수요조사 제출 (손님)

- 손님이 지정한 위치를 기반으로 수요조사 정보 제출
- 주 1회 횟수제한

![수요조사.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%2588%2598%25EC%259A%2594%25EC%25A1%25B0%25EC%2582%25AC.gif)

## 점포 상세페이지

- 메뉴 목록 확인
- 점포 스케줄, 통계(리뷰, 찜 개수) 확인
- 리뷰 확인, 신고 기능

![점포상세조회.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%25A0%2590%25ED%258F%25AC%25EC%2583%2581%25EC%2584%25B8%25EC%25A1%25B0%25ED%259A%258C.gif)

## 마이페이지 (사장님)

### 리뷰 답글 및 AI 답글 초안 기능 (사장님)

- gemini AI를 사용한 리뷰 답글 초안 작성

![AI사장님답글초안.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/AI%25EC%2582%25AC%25EC%259E%25A5%25EB%258B%2598%25EB%258B%25B5%25EA%25B8%2580%25EC%25B4%2588%25EC%2595%2588.gif)

### 수요조사 확인 (사장님)

- nivo chart 사용
- 수요조사가 제출된 지역을 기반으로 조회 가능

![수요조사 헤더부착.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%2588%2598%25EC%259A%2594%25EC%25A1%25B0%25EC%2582%25AC_%25ED%2597%25A4%25EB%258D%2594%25EB%25B6%2580%25EC%25B0%25A9.gif)

### AI 로고 생성 (사장님)

- karlo

![AI로고 생성.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/AI%25EB%25A1%259C%25EA%25B3%25A0_%25EC%2583%259D%25EC%2584%25B1.gif)

### 매출 분석 (사장님)

- chart.js
- 일간, 주간 매출 및 메뉴 판매량

![사장님매출통계헤더부착.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%2582%25AC%25EC%259E%25A5%25EB%258B%2598%25EB%25A7%25A4%25EC%25B6%259C%25ED%2586%25B5%25EA%25B3%2584%25ED%2597%25A4%25EB%258D%2594%25EB%25B6%2580%25EC%25B0%25A9.gif)

### 스케줄 관리

- 카카오 맵
- 요일별 방문 장소 관리

![스케줄관리.gif](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/%25EC%258A%25A4%25EC%25BC%2580%25EC%25A4%2584%25EA%25B4%2580%25EB%25A6%25AC.gif)

# Jira 보고서

### 1주차

![image.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/image%204.png)

### 2주차

![image.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/image%205.png)

### 3주차

![image.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/image%206.png)

### 4주차

![image.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/image%207.png)

### 5주차

![image.png](README%20md%207ebbc7fad3354bb08f15c8de1d3d7d4c/image%208.png)