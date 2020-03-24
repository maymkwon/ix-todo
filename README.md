이 프로젝트는 [Create React App](https://github.com/facebook/create-react-app) 을 사용 하였습니다.

# 카카오 IX 사전 과제 저장소

**목차**

# Table of Contents

1. [실행 방법](#start)
2. [사용 라이브러리](#library)
3. [폴더 구조](#structure)
4. [프로젝트 진행](#process)
5. [문제 해결](#coding)
6. [회고](#retrospect)

---

## 실행 방법 <a name="start"></a>

**Client**

1. `cd ./client` 클라이언트 폴더로 이동
2. `npm i` 커맨드 입력
3. `npm start`
4. `localhost:3000` 접속

**Server**

데이터 베이스는 mysql 를 사용하였습니다.
실행하려는 컴퓨터에 mysql이 설치 되어 있어야 합니다. (_선행으로 이루어져야 됩니다_)

- 설치 프로그램 다운 : https://dev.mysql.com/downloads/mysql/
- 참고 부분 : https://whitepaek.tistory.com/16

1. `cd ./server` 서버 폴더로 이동
2. `npm i` 패키지 설치
3. database 접속계정 정보를 입력

   - `./server/config/config.json` 바꿀부분은 유저이름과 패스워드 입니다.

4. `npm run init-server` db를 설정합니다.
5. `npm start` 서버를 실행합니다.

---

## 프로젝트 사용 라이브러리 <a name="library" />

**Client**

- react
- typescript
- redux
- typesafe-actions
- redux-saga
- react-redux
- material-ui

_통신_

- axios

_스타일 관련_

- classnames
- styled-components

**Server**

- cors
- koa
- nodemon
- mysql
- sequalize

---

## 폴더 구조(client) <a name="structure"></a>

컴포넌트 폴더는 원래 페이지뷰별로 폴더를 나누는데 이번 프로젝트는 그 의미가 없을것 같아 `component` 폴더에 모두 작성하였습니다.

```
.src
+-- api
| +-- axios.ts : axios config
| +-- TodoServices.tsx : 서비스 관련 (현재는 투두 관련 api만 있어서 굳이 나눌필요가 없지만 서비스가 추가되면 따로 관리를 하기위해서 분리하여 관리하고 있습니다.)
|
+-- common
| +-- hooks : react hook관련 (공통)
| +-- Const,js : 상수 관리
| +-- CustomCssBaseline : 커스텀 global 스타일
| +-- selector : 리덕스 스토어 선택함수
| +-- utils : 기타 helper 함수 정의
|
+-- components : 모든 컴포넌트
|
+-- store : 액션 / 리듀서 / 사가 / 타입 관련
| |
| +-- todo
| | +-- action : 액션 함수
| | +-- reducer : 리듀서
| | +-- sagas : 사가 함수
| | +-- types : 타입정의
| |
| +-- index.ts : 스토어 인덱스 (combineReducer, rootSaga)
| +-- rootReducer.ts : combineReducer 파일
| +-- rootSaga.ts : root saga 파일
```

---

## 프로젝트 진행 <a name="process"></a>

아래의 순서로 작업하였습니다.

1. 서버 작업
2. 클라이언스 작업

---

## 문제해결 <a name="coding"></a>

#### 페이지네이션

기존에 서버로 페이지넘버와 사이즈를 넘겨서 서버에서 데이터를 받는 구조로 진행 하였습니다. 그런데 연결된 할일들의 정보를 표시를 하려고보니 문제가 있어서 전체리스트를 가져오는 작업으로 변경하였습니다. (데이터 베이스 테이블 구조를 잘 못잡아서.)

전체리스트를 가져와 시작 인덱스와 끝인덱스로 slice함수로 잘라서 현재 리스트 반환하는 컴포넌트를 작성하였습니다.

#### 리스트(todo list)

주어진 요구사항을 구현하였고
더보기 버튼에 수정과 삭제의 기능을 넣었습니다.
수정팝업에서는 셀렉트 박스를 이용해 부모의 todo를 연결할 수 있게, 완료 여부를 변경 할 수 있게 구현 하였습니다.
완료여부는 리스트를 눌러도 상태가 바뀌도록 작성 하였습니다.
부모가 있는 리스트는 알아볼수 있게 child 라고 표시를 하고 부모의 todo는 연결된 todo의 제목을 리스트에 표시 하였습니다.

_\*오류_(TODO)

```
Case 1 :  1(미완료), 1-1((완료)), 1-2((완료)) => 1(완료), 1-1((완료)), 1-2((완료)) : 정상

Case 2 :  1(완료), 1-1((완료)), 1-2((완료)) => 1(완료), 1-1((완료)), 1-2((미완료)) : 비정상

```

Case2의 경우 하나의 연결된 todo들에서 하위todo를 다시 미완료 처리를 하면 상위 부모의 상태가 바뀔수 없는점.

_\*예외상황_

```
Case 1 :  1(미완료/완료), 1-1((미완료/완료)), 1-2((미완료/완료)) => 1번 todo(부모) 삭제 = ?
```

현재구현은 연결된 하위todo들의 정보의 데이터를 수정 (1개의 todo에 연결된 하위todo가 10개라면 10번을 edit 호출)
(이부분은 서버 데이터베이스 테이블설계 || sequalize 사용 미숙..)

---

## 회고 (부족한점 위주) <a name="retrospect"></a>

- 서버와 최대한 서로 조화가 이루어 져야하는데 서버가 많이 부족하고 구조를 못잡다보니 화면단에서도 어떻게 해야할지 몰라 완벽하지 못한점
- 쓸데없는(그래도 필요하지만) 부분에서 시간을 많이 잡아먹음(디자인을 어떻게 할까 레이아웃은 어떻게할까)
- 타입정의(네이밍|구조) 부족
- 테스트 작성 미흡
- 새로운 시도를 하려고 하다가(데이터 베이스 선택 및 설정) 시간을 너무 많이 소비해버림

이번 과제를 하면서 새로운 도전을 해보았고 많이 알게 된 것 같습니다.
그만큼 모자란부분이 많이 있었던것 같습니다.

감사합니다.

```

```
