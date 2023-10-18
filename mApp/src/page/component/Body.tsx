import React, { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from './common/Header'
import MainHeader1 from './MainHeader1'
import EventSource, { EventSourceListener } from 'react-native-sse';
import { useQuery } from 'react-query';


// const EventSSE = () => {
//   const source = new EventSource("https://api.fleaauction.world/v2/sse/event");
  
//   // sse 열기
//   // 연결 시 할일
//   source.addEventListener("open", (e:any) => {
//     console.log('Open SSE connection.');
//   })
  
//   source.addEventListener("message", async (e:any) => {
//     console.log("New message event:", e.data);
//     const response = await e.data;
//     console.log("메시지 이벤트 중")
//     return JSON.parse(response);
//   })

//   source.addEventListener("error", (e:any) => {
//     if (e.type === "error") {
//       console.error("Connection error:", e.message);
//     } else if (e.type === "exception") {
//       console.error("Error:", e.message, e.error);
//     }
//   });
  
//   source.addEventListener("close", (e:any) => {
//     console.log("Close SSE connection.");
//   });

//   console.log("성공")
// };

// CSS 꾸미기
const styles = StyleSheet.create({
  bodyStyle : {
    // backgroundColor: "gray",
    border: 1,
    borderStyle: "solid",
    height:250
  },
  bodyText : {
    fontStyle: "italic",
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
    textAlign:'center',
    fontSize:50,
    justifyContent:'center',
    // flex: '1 0 0'
  },
  scrollContainer: {
    backgroundColor:"gray",
    height: 100,
    verticalAlign:"middle"
  },
  scrollContainerView: {
    width : 130,
    height : 100,
    padding: 10,
    border: '1 solid',
    borderColor: "black",
    AlignItems: "center",
    verticalAlign: "middle"
  },
  scrollCentainerText:{
    padding: 5,
    fontSize: 20,
    borderStyle: "solid",
    textAlign:"center",
    verticalAlign: "middle"
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

  useEffect(() => {
    const source = new EventSource("https://api.fleaauction.world/v2/sse/event");

    const listener: EventSourceListener = (e:any) => {
      if (e.type === "open") {
        console.log("SSE 오픈");
      } else if (e.type === "message") {
        const d = JSON.parse(e.data) as Data;

        setDatas((prevData:any) => [...prevData, datas]);

        console.log(`Received auctionId ${d?.auctionId}, viewCount: ${d?.viewCount}`);
      } else if (e.type === "error") {
        console.error("Connection error:", e.message);
      } else if (e.type === "exception") {
        console.error("Error:", e.message, e.error);
      }
    };

    source.addEventListener("open", listener);
    source.addEventListener("message", listener);
    source.addEventListener("error", listener);

    return () => {
      source.removeAllEventListeners();
      source.close();
    };
  },[])
  // const { isLoading, isError, data } = useQuery({
  //   queryKey: ['userLog'],
  //   queryFn: () =>
  //     {
        
  //   }
  // });


  // if (isLoading) return <Text>Loading...</Text>;
  // if (isError) {
  //   return <Text>Is is Error!</Text>
  // };

  console.log("return : " + datas)
  return (
    <View style={styles?.bodyStyle}>
      <Header></Header>
      <MainHeader1></MainHeader1>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator = {true}
        onMomentumScrollEnd ={() => {console.log('Scrolling is End')}}
        style={styles?.scrollContainer}
      >
        {/* <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View> */}
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        {
          // datas?.map((d, index) => {
          //   <View key={index} style={styles?.scrollContainerView}>
          //     <Text style={styles?.scrollCentainerText}>{d?.auctionId}</Text>
          //     <Text style={styles?.scrollCentainerText}>{d?.viewCount}</Text>
          //   </View>
          // })
        }
      </ScrollView>
      <MainHeader1></MainHeader1>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator = {true}
        onMomentumScrollEnd ={() => {console.log('Scrolling is End')}}
        style={styles?.scrollContainer}
      >
        {/* <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View>
        <View style={styles?.scrollContainerView}>
          <Text style={styles?.scrollCentainerText}>auctionId</Text>
          <Text style={styles?.scrollCentainerText}>viewCount</Text>
        </View> */}
        {
          datas?.map((d, index) => {
            <View key={index} style={styles?.scrollContainerView}>
              <Text style={styles?.scrollCentainerText}>{d?.auctionId}</Text>
              <Text style={styles?.scrollCentainerText}>{d?.viewCount}</Text>
            </View>
          })
        }
      </ScrollView>
    </View>
  )
}




export default Body;