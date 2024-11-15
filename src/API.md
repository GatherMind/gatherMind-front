# 프로젝트 기획안 (팀명미정, 임선택)

>   프로젝트명
>   >   GatherMind
>
>   프로젝트 개요
>   >   스터디 모집 & 운영 커뮤니티 서비스
>
>   프로젝트 시작일
>   >   2024년 11월 05일 
>
>   프로젝트 참여 인원 및 담당 기능 (총 4명, 풀스택)
>   >   김수환(조장): 스터디 관련 기능
>   >
>   >   정민석(조원): 메인페이지 관련 기능
>   >
>   >   박서원(조원): 일정 및 게시글 관련 기능
>   >
>   >   임선택(조원): 로그인 및 회원가입 관련 기능
>
>   담당 파트 기능 세부 기술 및 구현 정도
>   >   로그인, 회원가입, 마이페이지, 활동 내역 조회 등
>

## 메소드, 엔드포인트 정의

|메소드|엔드포인트|설명|
|:----------:|:----------|:----------:|
|POST|/api/members/login|회원 로그인|
|POST|/api/members/signup|회원 가입|
|GET|/api/members/check-${field}|기가입 회원 정보와 중복 여부 조회|
|GET|/api/members/me|회원 정보 조회|
|GET|/api/members/joined-group|가입 스터디 조회|
|GET|/api/members/recent-questions|작성 게시글 조회|
|GET|/api/members/recent-answers|작성 답변 조회|
|PUT|/api/members/update|회원 정보 수정|
|DELETE|/api/members/delete-account|회원 탈퇴|
|Method|End Point|Description|

## API 명세서

## 1. 회원 로그인
- **URL**: `/api/members/login`
- **메소드**: `POST`
- **설명**: 회원 로그인
- **요청 본문**:
  ```json
  {
    "memberId": "string",
    "password": "string"
  }
  ```
- **응답**:
  - **상태 코드**: `200 OK`
  - **응답 본문**:
    ```json
    {
      "token": "string"
    }
    ```

---

## 2. 회원 가입
- **URL**: `/api/members/signup`
- **메소드**: `POST`
- **설명**: 회원 가입
- **요청 본문**:
  ```json
  {
    "memberId": "string",
    "password": "string",
    "email": "string",
    "nickname": "string"
  }
  ```
- **응답**:
  - **상태 코드**: `201 Created`
  - **409**: 중복된 정보가 존재하는 경우

---

## 3. 기가입 회원 정보와 중복 여부 조회
- **URL**: `/api/members/check-{field}`
- **메소드**: `GET`
- **설명**: 기가입 회원 정보와 중복 여부 조회
- **경로 변수**:
  - `field`: 확인할 필드명 (예: `memberId`, `email`, `nickname`)
- **쿼리 파라미터**:
  - `value`: 중복 여부를 확인할 값
- **응답**:
  - **상태 코드**: `200 OK`
  - **응답 본문**:
    ```json
    {
      "isAvailable": true
    }
    ```

---

## 4. 회원 정보 조회
- **URL**: `/api/members/me`
- **메소드**: `GET`
- **설명**: 회원 정보 조회
- **보안**: `Bearer Token` 필요
- **응답**:
  - **상태 코드**: `200 OK`
  - **응답 본문**:
    ```json
    {
      "memberId": "string",
      "email": "string",
      "nickname": "string"
    }
    ```

---

## 5. 가입 스터디 조회
- **URL**: `/api/members/joined-group`
- **메소드**: `GET`
- **설명**: 가입한 스터디 목록 조회
- **보안**: `Bearer Token` 필요
- **응답**:
  - **상태 코드**: `200 OK`
  - **응답 본문**:
    ```json
    [
      {
        "studyId": "string",
        "studyName": "string"
      }
    ]
    ```

---

## 6. 작성 게시글 조회
- **URL**: `/api/members/recent-questions`
- **메소드**: `GET`
- **설명**: 최근 작성한 게시글 조회
- **보안**: `Bearer Token` 필요
- **응답**:
  - **상태 코드**: `200 OK`
  - **응답 본문**:
    ```json
    [
      {
        "questionId": "string",
        "title": "string",
        "studyName": "string"
      }
    ]
    ```

---

## 7. 작성 답변 조회
- **URL**: `/api/members/recent-answers`
- **메소드**: `GET`
- **설명**: 최근 작성한 답변 조회
- **보안**: `Bearer Token` 필요
- **응답**:
  - **상태 코드**: `200 OK`
  - **응답 본문**:
    ```json
    [
      {
        "answerId": "string",
        "questionTitle": "string",
        "studyName": "string"
      }
    ]
    ```

---

## 8. 회원 정보 수정
- **URL**: `/api/members/update`
- **메소드**: `PUT`
- **설명**: 회원 정보 수정
- **보안**: `Bearer Token` 필요
- **요청 본문**:
  ```json
  {
    "nickname": "string",
    "newPassword": "string"
  }
  ```
- **응답**:
  - **상태 코드**: `200 OK`
  - **400**: 입력값 오류

---

## 9. 회원 탈퇴
- **URL**: `/api/members/delete-account`
- **메소드**: `DELETE`
- **설명**: 회원 탈퇴
- **보안**: `Bearer Token` 필요
- **응답**:
  - **상태 코드**: `200 OK`

---
