# Troblueshooting
- 다음은 실행 시 이슈적인 부분을 추가합니다.

## 소스코드 받은 이후, 실행이 되지 않는 경우
(1) git clone https://github.com/BerkleyLim/Flea_Auction_Test 이후,
아래와 같은 이슈가 발생할 경우

![Alt text](image.png)
<br/><br/>

<h4>Solution</h4>

```
$ npm install # 이 명령어로 라이브러리 설치
```

(2) 아래와 같이 화면이 뜨는 경우 (Android 기준)
- 아래와 같은 화면은 개발할 당시 만든 UI이고, SSE 연동 전 파일 중 하나이다. (버그 맞습니다)
- 본인이 android/app/src/main/assets/index.android.bundle 을 갱신하지 않아 개발하는 과정 화면 그대로 표시가 되어진 상태로 출력이 되어진다. 

<img width='300px' height='600px' src='Screenshot_20231023_192630_mApp.jpg' alt="이상 화면 목록">

<h4>Solution</h4>

(2-1) 아래와 같이 명령어 실행

```
$ mkdir android/app/src/main/assets
$ cd android
$ gradle clean
$ cd ..
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
$ react-native run-android
```

(2-2) 기존 소스코드 다시 지우고 다시 실행
이 경우 다시 제거하고 다시 빌드하기


(3) 아래와 같이 에러가 났을 경우
```
info 💡 Tip: Make sure that you have set up your development environment correctly, by running react-native doctor. To read more about doctor command visit: https://github.com/react-native-community/cli/blob/main/packages/cli-doctor/README.md#doctor

C:\Users\user\test\Flea_Auction_Test\mApp\android\app\build\generated\rncli\src\main\java\com\facebook\react\PackageList.java:19: error: cannot find symbol
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
                                   ^
  symbol:   class RNGestureHandlerPackage
  location: package com.swmansion.gesturehandler
C:\Users\user\test\Flea_Auction_Test\mApp\android\app\build\generated\rncli\src\main\java\com\facebook\react\PackageList.java:25: error: cannot find symbol
import com.swmansion.rnscreens.RNScreensPackage;
                              ^
  symbol:   class RNScreensPackage
  location: package com.swmansion.rnscreens
C:\Users\user\test\Flea_Auction_Test\mApp\android\app\build\generated\rncli\src\main\java\com\facebook\react\PackageList.java:73: error: cannot find symbol
      new RNGestureHandlerPackage(),
          ^
  symbol:   class RNGestureHandlerPackage
  location: class PackageList
C:\Users\user\test\Flea_Auction_Test\mApp\android\app\build\generated\rncli\src\main\java\com\facebook\react\PackageList.java:76: error: cannot find symbol
      new RNScreensPackage()
          ^
  symbol:   class RNScreensPackage
  location: class PackageList
4 errors

FAILURE: Build completed with 2 failures.

1: Task failed with an exception.
-----------
* What went wrong:
Execution failed for task ':app:compileDebugJavaWithJavac'.
> Compilation failed; see the compiler error output for details.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
==============================================================================

2: Task failed with an exception.
-----------
* What went wrong:
java.lang.StackOverflowError (no error message)

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
==============================================================================
```


<h4>Soluion</h4>

- 먼저 만든다.

(4) ios 관련 에러

- 다음은 EXPO 버전이 아닌 CLI 에서 Windows 환경에서 실시 할 경우 안드로이드 설정 에러로 확인 될 수 있습니다.
- 이 경우, IOS가 아닌 Android 환경에서 테스트 하실 경우 무시하셔도 무방합니다.
- 현재, 본인은 Windows 환경에서 개발을 하였기 때문에 IOS 환경에서 개발하기가 어려워서 그냥 무시하며 개발을 하였습니다.

```
[react-native-gesture-handler] react-native-gesture-handler module was not found. Make sure you're running your app on the native platform and your code is linked properly (cd ios && pod install && cd ..).
```