import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import MainHeader from '../main/MainHeader'
import EventSource, { EventSourceListener } from 'react-native-sse';

// CSS 꾸미기
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
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

/**
 * 
 * @returns 
 * event: sse.auction_viewed
 * id: 2
 * data: {"auctionId":3927,"viewCount":59}
 */
interface Data {
  auctionId: number,
  viewCount: number
}
const Body = () => {
  const [datas, setDatas] = useState<Data[]>([]);


  useEffect(() => {
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
      setDatas((prevData:any) => [...prevData, d]);
    } else if (e.type === 'close') {
      setDatas([])
    }
  }

  source.addEventListener("open", listener);
  source.addEventListener("sse.auction_viewed", listener);
  source.addEventListener("sse.contents_viewed", listener);
  source.addEventListener("close", listener);
  return () => {
    source.close();
  };
  }, [])


  const scrollViewRef = useRef<ScrollView | null>(null);
  console.log(datas)

  return (
    <View style={styles?.bodyStyle}>
      <MainHeader></MainHeader>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        onMomentumScrollEnd={() => { console.log('Scrolling is End') }}
        style={styles?.scrollContainer}
      >
        {
          datas?.map((d, index) =>
            <View key={index} style={styles?.scrollContainerView}>
              <Text style={styles?.scrollCentainerText}>{d?.auctionId}</Text>
              <Text style={styles?.scrollCentainerText}>{d?.viewCount}</Text>
            </View>
          )
        }
      </ScrollView>
      <MainHeader></MainHeader>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        onMomentumScrollEnd={() => { console.log('Scrolling is End') }}
        style={styles?.scrollContainer}
      >
        {
          datas?.map((d, index) =>
            <View key={index} style={styles?.scrollContainerView}>
              <Text style={styles?.scrollCentainerText}>{`auctionId\n${d?.auctionId}`}</Text>
              <Text style={styles?.scrollCentainerText}>{`viewCount\n${d?.viewCount}`}</Text>
            </View>
          )
        }
      </ScrollView>
      <MainHeader></MainHeader>
    </View>
  )
}

export default Body;