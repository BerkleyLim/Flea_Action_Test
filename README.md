# Flea_Auction_Test
 - 이 프로젝트는 입사 전 플리옥션 사에서 코딩 테스트를 통해 개발자의 대한 자질이 있는지 실시
 - 프로젝트 특징 : React Native를 활용 할 수 있는 능력과, SSE Event를 활용하여 백엔드 API 연동
 - 실제 서비스는 방문 리스트 출력하는 메뉴를 확인 할 수 있으며 실행 전 연동을 할 수 있는지 본다.
 - 마지막으로 고객이 필요한 개발을 해주는 것으로 목표로 둔다.

# Client Name (고객사 명)
- (주) 플리옥션 (Flea Auction. Inc)
- 업종 : 미술 작품 판매 및 중계 (추정)
- Homepage : https://fleaauction.co/

# Object
- 현재 웹 개발에 특화된 개발자로써 앱 개발까지 숙련도를 올릴 수 있는 프로젝트 중 하나
- 아주 기초적이지만, React Native와 Back-End 통신을 하기 위해 숙련도를 올린다.
- Android WebView 및 Native와 함께 사용하는 Hybrid App 외적으로 React Native 스택을 쌓는다.
- 마지막으로, 개발 숙련도를 올리면서 고객의 요구사항에 알맞게 수행하여 고객에게 환영받는 개발자로 목표로 한다.

# User Requirements Specifacation
- 고객사께서 작품 구매를 위한 히스토리 페이지를 개발을 하기 위해 진행을 한다.
- SSE 기법으로 이용하여 옥션으로 판매 하는 형식으로 실시간 UI 갱신을 원한다.
- 전 단계인 React Native와 Server와 통신하여 해당 로그를 읽고, 로그의 토대로 데이터 삽입
- 이와 동시에 SSE 기법과 React Native의 이해도와 활용하는 방법을 학습을 요망

# DeadLine
- <div style="font-size:1.5em;">
    23년 10월 <s style="font-color:gray; font-size:50%">20일(금)</s> 23(월)
    <span style="font-color:red; font-size:80%">(보다 더 깔끔한 개발을 위해 마감 날짜 연장)</span>
  </div>

# Environment (갱신 예정)
- OS : Windows 11
- Node Version : 16.18.0 (가급적 동일한 버전 사용 추천 - 다른 버전일 경우 설정에 맞춰야 한다.)
- App : React Native
- Library : React-Query, Recoil

<img src="./storage/readme/environment.jpg" alt="개발 환경 상세" />

# Gettings Start (차후, 꾸준히 업데이트 예정) 
<h3>React Native 빌드 후 실행 방법 (Local)</h3>
(1) 먼저 clone을 받는다.

```
$ git clone https://github.com/BerkleyLim/Flea_Auction_Test
```
<br/>
(2) 다음으로 npm으로 node_module 설치

```
$ cd ./Flea_Auction_Test/mApp
$ npm install
```

(3) 이후 npm run start(개발모드 - 배포모드x)

```
$ npm run start
```

(4) android 폴더로 들어가 빌드를 해줍니다.

(5) 이후 안드로이드 배포

(6) ios 배포해줍니다. (mac os가 없으므로 실제 테스트 불가능)

# QnA (갱신예정)
<h3>1. React Native 로 앱개발 경험이 있다면, 상태관리는 어떤 것들을 사용해 보았으며, 가장 선호하는 방법은 무엇인지, 그리고 그 이유는 무엇입니까?</h3>

> - 저는 Profile Repository를 통해 Android뿐만 아닌 IOS도 호환되도록 Android WebView 기반 이외 Native 도입을 위해 시도를 해본적 있으나, 제대로 시작하지 못하였습니다.
> - 당시, Typescript와 React Native를 한번도 다뤄보지 않았으며 아직까지 보류상태로 남겨 두었지만, Typescript와 친해지고, React Native에 점차적으로 진입 전으로 남겨둔 상태였습니다.
> - 이번 프로젝트를 통해 React Native가 첫 프로젝트이며 현재 React Query로 실시간 UI 출력해주는 역할을 해주는 기능으로 구현 시켰고, SSE로 실시간으로 처리하는 용도로 사용하였습니다.
> - 개발이 완료될 경우 React Query로 실시간 비동기 처리와 Redux로 이용하여 state 영구 저장 기법으로 UI출력 이력을 저장하는 기법으로 구현해 볼 예정입니다.
<br/>
<h3>2. Flutter 로 앱개발 경험이 있다면, 상태관리는 어떤 것들을 사용해 보았으며, 가장 선호하는 방법은 무엇인지, 그리고 그 이유는 무엇입니까?</h3>

> - 저는 플로터의 대한 개발한 이력이 없기 때문에 답변을 드릴 수 없으며 앱 개발 역시 친해지면서 Flutter도 다뤄볼 예정입니다.
<br/>

<h3>3. 지금까지 앱 개발시 가장 challenging 주제는 무엇이였고 어떻게 해결하셨습니까?</h3>

> - App 개발 처음 시작 시 삼성전자서비스 SM 개발을 진행 하면서 Android WebView 기반 mOffice 신규 페이지 추가와 문자 전송을 위해 Native단과 WebView 통신 새로 구현을 하여 진행을 하였습니다.
> - 저는 React Native를 모르는 상태로 플리옥션에서 처음으로 진행을 하였고, 현재 제로 베이스에 가까운 상태로 시작을 하였습니다.
> - React Native는 React 문법의 약 90퍼 정도로 유사한 구조 형태로 느끼고, 언어 적응을 하는데 크게 어려움은 없었지만, RN 개발에 있어서 각각의 버그와의 싸움에 시달렸었습니다.
> - RN의 관련된 디버그 정보의 대해 자료가 많이 부족하고 구글링으로도 해결이 되지 않는 부분이 존재하여 결국 에러 로그를 보고 추측을 하면서 에러로그와 관련된 힌트 보고 해결을 하는 방식으로 이끌어갔습니다.

# End
먼저, 플리옥션 고객사에게 앱개발의 기회를 주셔서 감사드립니다. <br/>
지금까지의 저는 웹 개발자에 특화된 개발 자중 하나인 상태로 스택을 보유하고 있었습니다. <br/>
React 스택을 얻고나서 React Native 개발을 접하면서 또 하나의 스택을 얻게 되었으며 보다 더 개발의 대한 자신감이 생기게 되었습니다. <br/>
차후, 저와 고객사와 맞는 개발자가 되고, 원활한 협업과 동시에 함께하는 인재로 만나뵙고 싶습니다. <br/>
감사합니다. <br/>
