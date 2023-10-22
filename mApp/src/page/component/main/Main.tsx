import { StyleSheet, View } from 'react-native';
import MainHeader1 from './MainHeader'
import MainBody from './MainBody';

// CSS 꾸미기
const styles = StyleSheet.create({
  bodyStyle: {
    border: 1,
    borderStyle: "solid",
    width: '100%',
    height: 550,
    zIndex: 5
  },
  bodyText: {
    fontStyle: "italic",
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    fontSize: 50,
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: "gray",
    height: "100%"
  },
  scrollContainerView: {
    margin: 15,
    padding: 10,
    backgroundColor: "#5f9ea0",
    flex: 1,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollCentainerText: {
    fontSize: 20,
    padding: 15,
    color: 'white',
    textAlign: 'center'
  }
})

// /**
//  * 
//  * @returns 
//  * event: sse.auction_viewed
//  * id: 2
//  * data: {"auctionId":3927,"viewCount":59}
//  */
interface Data {
  auctionId: number,
  viewCount: number
}

type mainParameter = {
  sortData:Data[],
  setSortData:any,
  sortReverseData:Data[],
  setSortReverseData:any
}

const Main = ({sortData, setSortData, sortReverseData, setSortReverseData}:mainParameter) => {
  return (
    <View style={styles?.bodyStyle}>
      {/* <MainHeader1></MainHeader1> */}
      <MainHeader1>가로 스크롤 영역 #1</MainHeader1>
      <MainBody data={sortData} setData={setSortData}></MainBody>
      <MainHeader1>가로 스크롤 영역 #2</MainHeader1>
      <MainBody data={sortReverseData} setData={setSortReverseData}></MainBody>
      <MainHeader1></MainHeader1>
    </View>
  )
}

export default Main;