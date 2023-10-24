import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useEffect } from "react";
import React = require("react");
import { useDispatch, useSelector } from "react-redux";
// import { changeSortData } from "./redux/redux/action/sortData";
import { SortReverseDataState, addSortReverseData, changeSortReverseData } from "./redux/redux/action/sortReverseData";
import SSE from "./util/SSE";
import Header from "./page/component/common/Header";
import Main from "./page/component/main/Main";
import { SortDataState, addSortData, changeSortData } from "./redux/redux/action/sortData";

// 이것은 React-native에 사용될 메인 함수
function Index() {
  const [sData, setSData] = React.useState<SortDataState>({auctionId:0, viewCount:0});
  const [sRData, setSRData] = React.useState<SortReverseDataState>({auctionId:0, viewCount:0});
  const dispatch = useDispatch();

  const sortData = useSelector((state: any) => state.sortData);
  const sortReverseData = useSelector((state: any) => state.sortReverseData);
  const [refreshing, setRefreshing] = React.useState(false);

  // sortData 메모리 저장 (useMemo 사용)
  useEffect(() => {
    if (sData.auctionId !== 0) {
      dispatch(addSortData(sData))
    }
  },[sData])
  useEffect(() => {
    // 여기서 viewCount 갱신 시작
    let data1 = sortData;
    if (!!sortData && sortData.length > 0) {
      for (let index = sortData.length - 2; index >= 0; index--) {
        console.log(data1[sortData.length - 1].auctionId === data1[index].auctionId)
        if (data1[sortData.length - 1].auctionId === data1[index].auctionId) {
          data1[index].viewCount = sortData[sortData.length - 1].viewCount;
        }
      }
    }
    console.log(data1)
    dispatch(changeSortData(data1));
  }, [sortData])

  // sortReverseData 메모리 저장 (useMemo 사용)
  useEffect(() => {
    if (sRData.auctionId !== 0) {
      dispatch(addSortReverseData(sRData))
    }
  },[sRData])
  useEffect(() => {

    // dispatch(addSortReverseData(sRData))
    // 여기서 viewCount 갱신 시작
    let data2 = sortReverseData;
    if (!!sortReverseData && sortReverseData.length > 0) {
      for (let index = sortReverseData.length - 2; index >= 0; index--) {
        if (data2[sortReverseData.length - 1].auctionId === data2[index].auctionId) {
          data2[index].viewCount = sortReverseData[sortReverseData.length - 1].viewCount;
        }
      }
    }
    dispatch(changeSortReverseData(data2));
  }, [sortReverseData])

  // 이부분은 pull-to-refresh를 위한 함수 로직
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    // 오름 차순 로직 실시, 새로고침 시 state 값 날라가서 AsyncStorage 사용
    let tempData = sortData;
    tempData = tempData?.sort((a: any, b: any) => a.auctionId - b.auctionId);
    dispatch(changeSortData(tempData));

    // 내림 차순 로직 실시, 새로고침 시 state 값 날라가서 AsyncStorage 사용
    tempData = sortReverseData;
    tempData = tempData?.sort((a: any, b: any) => b.auctionId - a.auctionId);
    dispatch(changeSortReverseData(tempData));
  }, []);


  // 시작 할 때, sse를 킨다
  useEffect(() => {
    SSE({ setSData, setSRData });

  }, [])


  return (
    // Provider Setting
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header></Header>
      <Main />
    </ScrollView>
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

export default Index;
