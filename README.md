# Budget-App-JavaScript

### Demo 사진

![image](https://user-images.githubusercontent.com/57528803/99923938-685bb500-2d7b-11eb-87ba-c5cbd082d084.png)

### ​프로젝트 목적

- MVC 패턴을 적용
- 차트 적용(데이터의 변화 여부를 한 눈에 파악할 수 있게 하기 위함.)
- ES6 문법 적용(생성자 함수를 사용하지 않고 클래스 문법 사용, import, export를 활용한 모듈 시스템)

### 구현 기능

- 수입 항목 작성하기
- 지출 항목 작성하기
- 수입 항목 한 눈에 보여주기
- 지출 항목 한 눈에 보여주기
- 수입 항목 + 지출 항목 한 눈에 보여주기
- 상황판에서 지출, 수입, 그리고 현재 나의 자산 보여주기
- 데이터베이스 대신 로컬스토리지에 데이터를 저장하여 리로딩되더라도 현재 상태 유지하기
- 데이터 삭제 기능
- 데이터 수정 기능
- 상황판의 가운데에 차트 보여주기(지출과 수입의 비율에 따라 달라짐.)

### 참고

https://www.youtube.com/watch?v=SQbCwfGC7EM : 해당 튜토리얼의 HTML, CSS 코드를 참고하였습니다.

### 실행 안내

1. git clone https://github.com/byungchanparkme/mvc-budget-app-es6 : 프로젝트의 리포지토리에 저장되어 있는 모든 파일들을 내려받아옵니다.
2. npm install : package.json에 기록되어 있는 라이브러리들을 설치해줍니다.
3. npm run dev : 서버를 구동시켜서 프로젝트가 어떤 식으로 동작하는지 살펴볼 수 있습니다.
4. npm run build : 프로젝트에 쓰이는 모든 js 파일들을 번들화시켜서 하나의 빌드된 파일로 만들어줍니다.
