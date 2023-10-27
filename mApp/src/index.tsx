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

  const sortData = React.useMemo(() => useSelector((state: any) => {return state.sortData as SortDataState[]}),[]);
  const sortReverseData = React.useMemo(() => useSelector((state: any) => {return state.sortReverseData as SortReverseDataState[]}),[]);
  const [refreshing, setRefreshing] = React.useState(false);

  // sortData 메모리 저장 (useMemo 사용)
  useEffect(() => {
    if (sData.auctionId !== 0) {
      dispatch(addSortData(sData))
    }
    // 여기서 viewCount 갱신 시작
    const data2 : SortReverseDataState[] = sortReverseData.map(
      (d) => 
        d.auctionId === sRData.auctionId ?
        {...d, viewCount:sRData.viewCount} :
          d
    )
    dispatch(changeSortReverseData(data2));
  },[sData])

// sortReverseData 메모리 저장 (useMemo 사용)
  useEffect(() => {
    if (sRData.auctionId !== 0) {
      dispatch(addSortReverseData(sRData))
    }

    // 여기서 viewCount 갱신 시작
    const data1 : SortDataState[] = sortData.map(
      (d) => 
        d.auctionId === sRData.auctionId ?
         {...d, viewCount:sRData.viewCount} : 
         d
    )
    console.log(data1)
    dispatch(changeSortData(data1));
  },[sRData])




  const sortAsc = React.useCallback(() => {
    console.log(sortData)
    let tempData = sortData.sort((a: SortDataState, b: SortDataState) => a.auctionId - b.auctionId);
    dispatch(changeSortData(tempData));
  },[])

  const sortDesc = React.useCallback(() => {
    let tempData = sortReverseData?.sort((a: SortReverseDataState, b: SortReverseDataState) => b.auctionId - a.auctionId);
    dispatch(changeSortReverseData(tempData));
  },[])

  // 시작 할 때, sse를 킨다
  useEffect(() => {
    SSE({ setSData, setSRData });
  }, [])


  // 이부분은 pull-to-refresh를 위한 함수 로직
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    let s = useSelector((state: any) => state.sortData as SortDataState[]);
    console.log(s)
  }, []);


  useEffect(() => {
      console.log(sortData)
      console.log(sortReverseData)
    try {
      // 오름 차순 로직 실시, 새로고침 시 state 값 날라가서 AsyncStorage 사용
      sortAsc();
  
      // 내림 차순 로직 실시, 새로고침 시 state 값 날라가서 AsyncStorage 사용
      sortDesc();

    } catch (error) {
      console.log(error)
    }
  }, [])


  return (
    // Provider Setting
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} enabled={false}/>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        // <RefreshControl refreshing={refreshing} />
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
