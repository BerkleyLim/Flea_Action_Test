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
import AsyncStorage from '@react-native-async-storage/async-storage';
import React = require("react");
import SSE from "./src/util/SSE";

// Data에 사용할 인터페이스 설정
interface Data {
  auctionId: number,
  viewCount: number
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


  // sortData 저장
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
  
  // sortReverseData 저장
  useEffect(() => {
    // 여기서 viewCount 갱신 시작
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
    SSE({ setSortData, setSortReverseData });
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
