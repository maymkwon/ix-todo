**Server**
실행 환경 : MAC

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
