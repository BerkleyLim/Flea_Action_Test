/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "react-native-gesture-handler";
import Header from './src/page/component/common/Header'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import Main from "./src/page/component/main/Main";
import EventSource, { EventSourceListener } from "react-native-sse";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React = require("react");

// Data에 사용할 인터페이스 설정
interface Data {
  auctionId: number,
  viewCount: number
}

// SSE 함수용 파라미터 타입 지정
type sseParameter = {
  setSortData: any,
  setSortReverseData: any,
  closeCount: Number
}

// 이 함수는 SSE 연동할 때 쓰는 환경 설정용 함수이다

const sse = ({ setSortData, setSortReverseData, closeCount }: sseParameter) => {
  // 여기서는 SSE Event Type과 맞춰야 하므로 custom을 써야한다.
  type FleaCustomEvents = "sse.contents_viewed" | "sse.auction_viewed";
  const source = new EventSource<FleaCustomEvents>("https://api.fleaauction.world/v2/sse/event");


  const listener: EventSourceListener<FleaCustomEvents> = (e: any) => {
    if (e.type === 'open') {
      // SSE를 연다
      console.log('open')
    } else if (e.type === 'message') {
      // event type이 message일 경우 수행
      console.log('message')
    } else if (e.type === 'sse.contents_viewed') {
      // event type이 sse.contents_viewed 일경우 수행
      // 현재 LogCat으로 확인할 경우 로그는 돌아가지만, 인증을 넣어야 수행 가능하다.
      console.log('sse.contents.viewed, 현재 403 에러로 연결 불가능')
    } else if (e.type === 'sse.auction_viewed') {
      // event type이 sse.auction_viewed일 경우 수행
      // 이부분이 핵심이 되는 부분이다.
      console.log('sse.auction_viewed')

      const d = JSON.parse(e.data) as Data;

      console.log(d)

      // state 값을 저장하는 로직, 여기서는 오름차순, 내림차순 데이터를 저장한다.
      setSortData((prevData: any) => [...prevData, d]);
      setSortReverseData((prevData: any) => [...prevData, d]);

      // 20개가 넘어가면 닫아버리기
      // if (closeCount > 20) {
      //   source.removeAllEventListeners();
      //   source.close();
      //   console.log("SSE close()")
      // }
    }
  }

  source.addEventListener("open", listener);
  source.addEventListener("sse.auction_viewed", listener);
  source.addEventListener("sse.contents_viewed", listener);
  return () => {
    source.close();
  };
}

// 이것은 React-native에 사용될 메인 함수
function App(): JSX.Element {
  const [refreshing, setRefreshing] = React.useState(false);
  const [sortData, setSortData] = useState<Data[]>([]);
  const [sortReverseData, setSortReverseData] = useState<Data[]>([]);

  // 이부분은 pull-to-refresh를 위한 함수 로직
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    // 오름 차순 로직 실시, 새로고침 시 state 값 날라가서 AsyncStorage 사용
    let tempData;
    await AsyncStorage.getItem('sortData', (err, result) => {
      console.log(result)
      tempData = JSON.parse(result);
    });
    await AsyncStorage.removeItem('sortData');
    console.log(tempData)
    tempData = tempData.sort((a, b) => a.auctionId - b.auctionId);
    setSortData(tempData);

    // 내림 차순 로직 실시, 새로고침 시 state 값 날라가서 AsyncStorage 사용
    await AsyncStorage.getItem('sortReverseData', (err, result) => {
      console.log(result)
      tempData = JSON.parse(result);
    });
    await AsyncStorage.removeItem('sortReverseData');
    console.log(tempData)
    tempData = tempData.sort((a, b) => b.auctionId - a.auctionId)
    setSortReverseData(tempData);
  }, []);


  // 항시 실시간 업데이트용으로 조건 없이 그냥 함
  useEffect(() => {
    // 여기서 viewCount 갱신 시작
    // 오름차순 데이터 갱신
    if (!!sortData && sortData.length > 0) {
      let data1 = sortData;
      for (let index = sortData.length - 2; index >= 0; index--) {
        if (data1[sortData.length - 1].auctionId === data1[index].auctionId) {
          data1[index].viewCount = sortData[sortData.length - 1].viewCount;
        }
        setSortData(data1);
      }
    }
    AsyncStorage.setItem('sortData', JSON.stringify(sortData));
  }, [sortData])

  useEffect(() => {
    // 내림차순 데이터 갱신
    if (!!sortReverseData && sortReverseData.length > 0) {
      let data2 = sortReverseData;
      for (let index = sortReverseData.length - 2; index >= 0; index--) {
        if (data2[sortReverseData.length - 1].auctionId === data2[index].auctionId) {
          data2[index].viewCount = sortReverseData[sortReverseData.length - 1].viewCount;
        }
        setSortReverseData(data2);
      }
    }
    AsyncStorage.setItem('sortReverseData', JSON.stringify(sortReverseData));
  }, [sortReverseData])


  // 시작 할 때, sse를 킨다
  useEffect(() => {
    let closeCount = sortData.length;
    sse({ setSortData, setSortReverseData, closeCount });
  }, [])


  return (
    // Provider Setting
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Header></Header>
        <Main sortData={sortData} setSortData={setSortData} sortReverseData={sortReverseData} setSortReverseData={setSortReverseData} />
      </ScrollView>
    </SafeAreaView>
  );
}

// CSS 꾸미기
const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#c8c8c8',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 42
  },
});

export default App;
