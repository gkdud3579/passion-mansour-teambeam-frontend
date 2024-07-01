# 팀글벙글
팀글벙글은 프로젝트 일정 관리를 효율적으로 할 수 있도록 도와주는 협업 툴입니다.   
다양한 기능을 통해 팀원 간의 소통과 작업 관리를 원활하게 진행할 수 있습니다. 

## 기술 스택
### 백엔드
- Spring boot
- Spring Security
- Redis
- Socket io

### 프론트엔드
- React
- Next js
- TypeScript
- Socket io
- React Query

## 프로젝트 구조
<p align="center">
  <img src="https://github.com/kitewater/teambeam-backend/assets/97283971/16aede00-6a1a-4bb4-8554-11c672634790" width="100%">
</p>

# 담당 기능

## 팀페이지
### 1. 투두리스트 만들기
https://github.com/kitewater/teambeam-backend/assets/97283971/b9af08f4-0059-427d-83e5-aba8e4f856ec
- 투두리스트 생성 및 삭제 기능 지원
- 투두리스트는 상위, 중위, 하위인 트리구조로 생성 가능
- 하위 투두리스트에는 담당자 태그와 과업 카테고리를 시각적으로 볼 수 있는 태그 기능을 지원

### 2. 캘린더 기능
https://github.com/kitewater/teambeam-backend/assets/97283971/ed40118a-077d-4739-88fe-9cb1f48166b4
- 스케줄 생성 및 삭제 기능 지원
- 캘린더에는 상위 투두의 일정들과 캘린더에서 추가하는 단발성 스케줄들이 표시
- 단발성 캘린더에는 카카오 API를 활용한 도료명 주소 검색을 통해 장소를 추가할 수 있는 기능을 지원

### 3. 채팅 기능
https://github.com/kitewater/teambeam-backend/assets/97283971/92f4b182-8022-4443-acd0-b8edde35d3a8
- 채팅 페이지에서 실시간 웹소켓 채팅 지원
- 환경설정에서 설정하는 닉네임과 프로필 이미지를 반영
- 스레드 형식으로 되어있어, 채팅 별로 구분되어 댓글을 달 수 있는 기능을 지원
