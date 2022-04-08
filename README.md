# 검은띠 휘날리며

![BLACKBELT](https://user-images.githubusercontent.com/67628725/162347404-c4a0e973-aadd-4d3c-8167-aa6766ec69bf.png)

## BlackBelt?  
`BlackBelt`는 우리문화 `태권도`를 세계에 홍보하기 위한 웹 기반 `AI 체험형 콘텐츠` 서비스입니다.  
집에서 쉽고 재미있게 태권도를 학습해보세요! AI pose detection 기술로 자연스럽게 올바른 태권도 동작을 따라하도록 유도합니다.    
충분한 연습 후에는, 국기원과 동일한 방식으로 심사를 받아 단증을 획득할 수 있습니다. 겨루기로 원하는 상대와 1:1 배틀을 벌여 실력을 가릴 수도 있습니다.  태권도 짱이 되고 싶다면 BlackBelt로 수련을 시작하세요!    

## 게요  
* 프로젝트명: 검은띠 휘날리며[black belt]
* 서비스 특징: AI 모션인식을 통한 태권도 학습 web service
* 주요 기능
  - 태권도 동작 학습 모델 기반 태권도 연습모드 및 심사
  - WebSocket을 통한 겨루기 매칭
  - WebRtc기술을 활용한 겨루기 화면
* 주요 기술
  - React
  - REST API
  - Node.js
  - MySQL
  - AWS EC2 + NGINX
  - Docker + Jenkins
* 참조 리소스
  - openvidu - webRtc
* 배포 환경
  - URL: https://j6a506.p.ssafy.io//


## 카테고리

| Application | Domain | Language | Framework |
| ---- | ---- | ---- | ---- |
| :white_check_mark: Desktop Web | :white_check_mark: AI | :white_check_mark: JavaScript | :black_square_button: Vue.js |
| :black_square_button: Mobile Web | :black_square_button: Big Data | :black_square_button: TypeScript | :white_check_mark: React |
| :black_square_button: Responsive Web | :black_square_button: Blockchain | :black_square_button: C/C++ | :black_square_button: Angular |
| :black_square_button: Android App | :black_square_button: IoT | :black_square_button: C# | :white_check_mark: Node.js |
| :black_square_button: iOS App | :black_square_button: AR/VR/Metaverse | :black_square_button: ​Python | :black_square_button: Flask/Django |
| :black_square_button: Desktop App | :black_square_button: Game | :white_check_mark: Java | :black_square_button: Spring/Springboot |
| | | :black_square_button: Kotlin | :black_square_button: Next.js |

# 서비스 소개  
### 메인페이지
![메인페이지](https://user-images.githubusercontent.com/67628725/162353823-01faf355-ec52-4404-ba73-d09e30f637a1.gif)  

### 연습모드  
#### 기본동작
![기본동작](https://user-images.githubusercontent.com/67628725/162353919-a5bdbad7-0b05-48b7-8c15-d55ac00c1811.gif)  
  
#### 연결동작  
![연결동작](https://user-images.githubusercontent.com/67628725/162353937-2fb67ce5-21c0-4d12-a007-69eed428cac5.gif)  
  
  
 ### 마이페이지  
 ![마이페이지_1](https://user-images.githubusercontent.com/67628725/162354129-31ea5577-54b0-4dd8-b53a-4bd4a6f42097.gif)  
 
 ### 번역기능  
 ![번역](https://user-images.githubusercontent.com/67628725/162354140-5a7dec28-29ea-4cab-934c-a5ffbd87bc34.gif)





# 프로젝트 상세 설명

## 1. 프론트
 // 여기에 각자한거 추가 엄청 긴거는 따로 빼서 하고 알맞게 메인에서 보여줬으면 하는것만 넣기!!!

## 2. 백엔드
### 웹소켓

### 개요

1:1 배틀 [겨루기] 기능에서

client-client 간 양방향 통신을 구현하기 위해 웹소켓 통신을 사용함.

[ SockJs + STOMP ]

### 기술스택 선정이유

- Polling / Long Polling / SSE 방식을 고려했지만  ‘대용량, 실시간, 단기’ 통신인 우리 서비스와 맞지않아 기각
- 웹소켓 라이브러리 [socket.io/](http://socket.io/) sockJs 등 중 Spring Framework 에서 더 안정적인 sockJs 라이브러리 선택
- 통신규약을 위해 메시징 프로토콜 STOMP 사용

### WebSocket

- 서버↔클라이언트 간 양방향통신 가능
- HTTP 환경에서 사용가능한 TCP 연결방식
- HTML5 표준 (브라우저 별 지원현황 확인)

### STOMP

- Frame 기반 프로토콜
- MessageBroker 인터페이스 사용
- Sub/ Pub 구조

![소켓메시지프로토콜2.png](./README.assets/%EC%86%8C%EC%BC%93%EB%A9%94%EC%8B%9C%EC%A7%80%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C2.png)

### 동작방식

1. Nginx 경로설정
    1.  http→ws 통신 헤더 요청으로 프로토콜 upgrade

![웹소켓서버설정.2png.png](./README.assets/%EC%9B%B9%EC%86%8C%EC%BC%93%EC%84%9C%EB%B2%84%EC%84%A4%EC%A0%95.2png.png)

1. Server측 endpoiont 설정
2. Client 측 지정 endpoint로 socket 객체생성
3. Server 측 수신한 데이터 재발행하는 메서드 작성
4. Client 소켓데이터 send, receive

### Endpoint 경로

[https://j6a506.p.ssafy.io/stomp/](https://j6a506.p.ssafy.io/stomp/)

### WS API

| 기능 | 프로토콜 | 동작 | api | 메시지 Type |
| --- | --- | --- | --- | --- |
| 개인세션 생성 | ws | sub | api/que/user | LOGIN |
| 겨루기 신청 | ws | pub | api/que/user/{게스트 id} | INVITE |
| 신청 수락/거절 | ws | pub | api/que/user/{호스트 id} | ACCEPT/REFUSE |
| 대기방 입장 | ws | pub | api/que/user/{호스트 id} | ENTER |

 

### [지정큐] 시퀀스 다이어그램

![시퀀스다이어그램2.png](./README.assets/%EC%8B%9C%ED%80%80%EC%8A%A4%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A82.png)

## 3. 서버
 #### 1. 서버 접속 정보

> server ip : j6a506.p.ssafy.io  
> client id : ubuntu  
> client pw : pem파일로 대체 (MM첨부파일 확인, 팀원 이외에 공유 금지)

<br>

- 서버에서 사용하는 브랜치는 develop 브랜치 이용
  - 서버에 변경사항 적용시 작업한 브랜치 develop에 merge한 뒤 pull하여 적용 확인

#### 2. 포트 정보

| 포트 번호 |                   이름                    |
| :-------: | :---------------------------------------: |
|    22     |                    SSH                    |
|    53     |                    DNS                    |
|    80     | Redirected to Port 443 by nginx (docker)  |
|    443    | Redirected to Port 3000 by nginx (docker) |
|   3000    |             Frontend (Docker)             |
|   5050    |              MySQL (Docker)               |
|   8000    |             Backend (Docker)              |
|   8080    |         Jenkins Controller Web UI         |
|   8447    |      openvidu server https (Docker)       |
|   8448    |       openvidu server http (Docker)       |
|   8888    |       kurento media server (Docker)       |
|   8888    |        jupyter notebook (비활성화)        |
|   50000   | Jenkins TCP Agent Listener Port (Docker)  |

#### 3. 아키텍처 구성도

<br>

![아키텍처 구성도](./README.assets/blackBeltArchitecture.png)

<br>

#### 4. 서버 설계 상세내용

- 주피터 접속 정보 및 상세 설명 - > server ip : j6a506.p.ssafy.io:8888
  <br>설명 : https로 하기위해 사설 cert 키로 진행해서 크롬에서 안전하지 못한 페이지로 인식합니다.

  - 노션 - [주피터 노트북 설치과정 보기](https://half-leather-4d3.notion.site/d066fbefa6c44f8ba407f4c77b1cf7d1)


- 도커 및 도커 컴포즈 설치
  - 노션 - [도커 설치과정 보기](https://half-leather-4d3.notion.site/4fcf091259e14df5bf60c13e837bf79d)


- 젠킨스 활용
  - 노션 - [젠킨스 깃 연동 자동 빌드/배포 보기](https://half-leather-4d3.notion.site/ce92c2f95e044c3b98cdd370b6c48bdc)


- NGINX & CERTBOT
  - 노션 - [엔진엑스 세팅 및 프록시 설정 보기](https://half-leather-4d3.notion.site/NGINX-CERTBOT-5271e86c1e9b4fe086c90c1eac482d66)


- 서버 mysql 세팅
  - 노션 - [서버 mysql 세팅 과정 보기](https://half-leather-4d3.notion.site/mysql-f55c1ba091be4573aeb044e6b3f52517)

- 프론트 / 백 도커
  - 노션 - [프론트 / 백 도커파일 보기](https://half-leather-4d3.notion.site/44e6651adb73413aba23f0fd6fa795a9)

 
## 4. AI
 // 여기에 각자한거 추가
<br>

<br>

## 0️⃣ Members

<table>
  <thead>
  	<tr>
      <td align="center">
        <a href="https://github.com/rosieyeon/">
          <img src="https://avatars.githubusercontent.com/u/70363530?v=4" width="300px"/>
        </a>
        <p>
          <br />
          <b>연승은</b>
          <br/>
          <span>Frontend | Leader | Design</span>
        </p>
      </td>
      <td align="center">
      	<a href="https://github.com/Talia2019">
          <img src="https://avatars.githubusercontent.com/u/55391944?v=4" width="300px"/>
        </a>
        <p>
          <br />
          <b>정지영</b>
          <br/>
          <span>Frontend | Design</span>
        </p>
      </td>
      <td align="center">
      	<a href="https://github.com/Choi-YoungUn">
          <img src="https://avatars.githubusercontent.com/u/87463835?v=4" width="300px"/>
        </a>
        <p>
          <br />
          <b>최영운</b>
          <br/>
          <span>Frontend | AI</span>
        </p>
      </td>
    </tr>
  </thead>
  <tbody>
  	<tr>
    	<td>
        <ul>
          <li>추가예정</li>
          <li>추가예정</li>
          <li>추가예정</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>추가예정</li>
          <li>추가예정</li>
          <li>추가예정</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>추가예정</li>
          <li>추가예정</li>
          <li>추가예정</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>



<table>
  <thead>
  	<tr>
      <td align="center">
        <a href="https://github.com/ckdn9595">
          <img src="https://avatars.githubusercontent.com/u/68536095?v=4" width="300px"/>
        </a>
        <p>
          <br />
          <b>이지우</b>
          <br/>
          <span>Backend | AI</span>
        </p>
      </td>
      <td align="center">
      	<a href="https://github.com/limyt0">
          <img src="https://avatars.githubusercontent.com/u/80087763?v=4" width="300px"/>
        </a>
        <p>
          <br />
          <b>임영택</b>
          <br/>
          <span>Backend</span>
        </p>
      </td>
      <td align="center">
      	<a href="https://github.com/yunsoo-choi">
          <img src="https://avatars.githubusercontent.com/u/67628725?v=4" width="300px"/>
        </a>
        <p>
          <br />
          <b>최윤수</b>
          <br/>
          <span>Backend</span>
        </p>
      </td>
    </tr>
  </thead>
  <tbody>
  	<tr>
    	<td>
        <ul>
          <li>추가예정</li>
          <li>추가예정</li>
          <li>추가예정</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>추가예정</li>
          <li>추가예정</li>
          <li>추가예정</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>추가예정</li>
          <li>추가예정</li>
          <li>추가예정</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<br>

## 1️⃣

<br>

## 2️⃣

<br>

## 3️⃣

<br>

## 4️⃣

<br>

## 5️⃣

<br>

## 6️⃣

<br>
