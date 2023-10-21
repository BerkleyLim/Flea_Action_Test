import React, { useEffect, useRef, useState } from 'react'
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import MainHeader1 from './MainHeader1'
// import EventSource  from 'react-native-sse';
import { useQuery } from 'react-query';
import RNEventSource from 'react-native-event-source';

// CSS 꾸미기
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  bodyStyle: {
    border: 1,
    borderStyle: "solid",
    width: '100%',
    height: 550,
    zIndex:5
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
  const [datas, setDatas] = useState<Data[]>();

  const source = useRef<RNEventSource>();

  useEffect(() => {
    source.current = new RNEventSource("https://api.fleaauction.world/v2/sse/event");

    try {
      source.current.addEventListener("message", (e: any) => { 
        console.log("응답시간" + JSON.stringify(e))
        console.log( e.data) 
        console.log( e.type)
        const d = JSON.parse(e.data) as Data;

        setDatas((prevData: any) => [...prevData, d]);
      });
      source.current.addEventListener("error", (e: any) => {
        console.error("Connection error:", e.message, e.error);
      });
  
    } catch (e) { 
      console.log(e) 
    }
 
    return () => {
      source.current?.close();
    };
  }, [])


  const scrollViewRef = useRef<ScrollView | null>(null);
  console.log(datas)

  return (
    <View style={styles?.bodyStyle}> 

      <MainHeader1></MainHeader1> 
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        onMomentumScrollEnd={() => { console.log('Scrolling is End') }}
        style={styles?.scrollContainer}
      >
        {/* <Button title={"1"} onPress={() => {setIsChange(!isChange)}}>
          <View style={styles?.scrollContainerView}>
            <Text style={styles?.scrollCentainerText}>1</Text>
            <Text style={styles?.scrollCentainerText}>1</Text>
          </View>
        </Button> */}
        {
          datas?.map((d, index) => 
            <View key={index} style={styles?.scrollContainerView}>
              <Text style={styles?.scrollCentainerText}>{d?.auctionId}</Text>
              <Text style={styles?.scrollCentainerText}>{d?.viewCount}</Text>
            </View>
          )
        }
      </ScrollView>
      <MainHeader1></MainHeader1>
      <ScrollView
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
      <MainHeader1></MainHeader1>  
    </View>
  )
}

export default Body;