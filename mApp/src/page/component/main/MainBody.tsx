import { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

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
  data:Data[],
  setData:any,
}

const MainBody = ({data}:mainParameter) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  console.log(data)

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      onMomentumScrollEnd={() => { console.log('Scrolling is End') }}
      style={styles?.scrollContainer}
    >
      {
        data?.filter(() => data.length <= 20).map((d, index) =>
          <View key={index} style={styles?.scrollContainerView}>
            <Text style={styles?.scrollCentainerText}>{`auctionId\n${d?.auctionId}`}</Text>
            <Text style={styles?.scrollCentainerText}>{`viewCount\n${d?.viewCount}`}</Text>
          </View>
        )
      }
    </ScrollView>
  )
}

export default MainBody;