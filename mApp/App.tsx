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
  sortData:Data[],
  setSortData:any,
  sortReverseData:Data[],
  setSortReverseData:any
}

// 이 함수는 SSE 연동할 때 쓰는 환경 설정용 함수이다
const sse = ({sortData, setSortData, sortReverseData, setSortReverseData}:sseParameter) => {
  type FleaCustomEvents = "sse.contents_viewed" | "sse.auction_viewed";
  const source = new EventSource<FleaCustomEvents>("https://api.fleaauction.world/v2/sse/event");
  

  const listener: EventSourceListener<FleaCustomEvents> = (e:any) => {
    if (e.type === 'open') {
      console.log('open')
    } else if (e.type === 'message') {
      console.log('message')
    } else if (e.type === 'sse.contents.viewed') {
      console.log('sse.contents.viewed, 현재 403 에러로 연결 불가능')
    } else if (e.type === 'sse.auction_viewed') {
      console.log('sse.auction_viewed')

      const d = JSON.parse(e.data) as Data;

      console.log(d)
      setSortData((prevData:any) => [...prevData, d]);
      setSortReverseData((prevData:any) => [...prevData, d]);

      // 20개가 넘어가면 닫아버리기
      if (sortData.length > 20) {
        source.removeAllEventListeners();
        source.close();
        console.log("SSE close()")
      }
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

    let tempData;
    await AsyncStorage.getItem('sortData', (err, result) => {
      console.log(result)
      tempData = JSON.parse(result);
    });
    await AsyncStorage.removeItem('sortData');
    console.log(tempData)
    tempData = tempData.sort((a,b) => a.auctionId - b.auctionId);
    setSortData(tempData);
    
    await AsyncStorage.getItem('sortReverseData', (err, result) => {
      console.log(result)
      tempData = JSON.parse(result);
    });
    await AsyncStorage.removeItem('sortReverseData');
    console.log(tempData)
    tempData = tempData.sort((a,b) => b.auctionId - a.auctionId)
    setSortReverseData(tempData);
  }, []);


  // 항시 실시간 업데이트용으로 조건 없이 그냥 함
  useEffect (() => {
    AsyncStorage.setItem('sortData',JSON.stringify(sortData));
    AsyncStorage.setItem('sortReverseData',JSON.stringify(sortReverseData));
  })


  // 시작 할 때, sse를 킨다
  useEffect(() => {
    sse({sortData, setSortData, sortReverseData, setSortReverseData});
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
