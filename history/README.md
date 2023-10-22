# history
- 다음은 작업 내용의 대해 올려봅니다
- 방문시 피드백 드리면 감사하겠습니다.

<br/><br/>

## 16일
- 고객 요구 사항 분석
- React-Native Cli 버전으로 설치
- React Query 기반으로 SSE 기법을 UI로 처리하기 위해 설치
- React Native 설치 후 VS code 기반으로 쓸때 없는 빨간줄 제거
- ESline.js prettier.jsc 파일을 건들어 나만의 에디터 표기 설정
- 화면단 테스트 성공

<br/><br/>

## 17일
- RN폴더 구성 대략적으로 설정
- sse 통신 개발 시도만 함 (테스트는 아님) (현재 console.log 형식으로 받는 형태로만 개발 완료)
- NavigatorContainer 환경 설정 작업 시도
- 환경 설정 작업 이후, 각각의 에러를 갖는다.
> - app:mergeLibDexDebug 이슈 발생
> - react-native-reanimated/android 찾을 수 없는 에러 발생
> - Gradle 9.0 버전으로 업데이트 하라고 경고창 표시
> - android 폴더안 Gradle 설정 및 androidmanifest.xml 설정 이후 문제 발생
> - 현재 해결해야함

<br/><br/>

## 18일
- Android 환경에서 app:mergeLibDexDebug 이슈 해결
> - Issue #1 참조, 이 원인은 masked-view 패키지 충돌 때문에 진행이 되지 않음
> - 어제 masked-view와 관련된 패키지를 설치하여 충돌 문제로 android gradle build 과정에서 에러 남
- 디자인 완료, 화면 구성과 샘플 코드까지 이용하여 SSE의 데이터 값을 받아올 자리 구현 완료
- SSE 연동 테스트 실패, 현재 npm 라이브러리 문서를 읽고 이를 활용하여 개발을 하고 있지만, 무슨 원인이지 알 수 없음
- SSE 연동까지 성공 이후, 코드 정리와 component 분할까지 나누고, 불필요한 패키지도 정리 예정
- NavigatorContainer 버그 걸린 부분의 대해 하나하나 잡아가기 
> - 보통 서비스 작업 진행 시 Android Native App Intent 역할, React 웹 환경에서 React-Router-Dom 역할로 진행할 것이다.
- RN 초창기 패키지 설치시 안드로이드 부분 버그 이슈 해결 과정
> - https://yoonho-devlog.tistory.com/m/165

<br/><br/>

# 19일~21일
- masked-view 라이브러리를 @react-native-masked-view/masked-view 로 변경
- SSE 연동 문제로 인해 여러개의 디버그 툴과 Android App 부분 로그 확인과정에서 디버그 툴 사용
> React-devToos, Debugge-UI, VS code Debugger (LogCat 지원), React-Naive-Debugger 등
- Logcat으로 확인 한 결과, SSE 연동은 성공적으로 잘 돌아가나 아래의 메소드로 UI 부분에서 출력 되지 않음
```
source.current.addEventListener("message", (e: any) => {
  console.log("응답시간" + JSON.stringify(data))
  console.log( data.data) 
  console.log( data.type)
  const d = JSON.parse(data.data) as Data;
  setDatas((prevData: any) => [...prevData, d]);
});
```
- Library는 아래와 같이 사용 했으나 결과가 똑같고, 마지막에는 순수 JS로 가능한 EventSource 사용
> - react-native-sse
> - react-native-event-source
```
에러 로그
 LOG :  Sorry, your browser does not support server-sent events...
```
- 마지막 아래의 링크 참조 결과 React Native 에서 만든 SSE 기능을 Android 환경에서는 따로 손을 봐주지 않으면 정상 작동 되지 않는 것으로 확인
- 링크 :  https://github.com/facebook/react-native/issues/28835
- 링크2 : https://reactnative.dev/docs/network
- Android 환경에서 네트워크 통신은 http 프로토콜 요청이 기본적으로 막혀있음
- 해결 링크 : https://velog.io/@modac42asdfadsf/React-native-SSE-%EC%97%B0%EA%B2%B0

# 22일
- SSE 연동 성공 : Event Type을 sse.auction_viewed 로 설정하여 메시지를 받을 수 있음
- 현재 View 단에서 SSE 에서 받은 데이터를 활용하여 사용자 측에서 화면을 보여 줄 수 있음
- React Native Gettings Start 및 자습서를 참조하여 Pull-To-Refresh 기능 추가
- 마지막으로, 사용자 측에서 정렬을 활용하여 사용자에게 보여주기