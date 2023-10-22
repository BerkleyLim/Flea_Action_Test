/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "react-native-gesture-handler";
// import PTRView from 'react-native-pull-to-refresh';
import Body from './src/page/component/Body'
import Header from './src/page/component/common/Header'
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, ScrollView, StyleSheet, View, Text, RefreshControl } from "react-native";
import React from "react";


function App(): JSX.Element {
  const _refresh = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {resolve()}, 2000)
    })
  }
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    // Provider Setting
    // <PTRView onRefresh={_refresh}>
      <SafeAreaView>
        <ScrollView 
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <Header></Header>
          <Body></Body>
        </ScrollView>
      </SafeAreaView>
    // </PTRView>
  );
}

// CSS 꾸미기
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: screenWidth,
    // height: screenHeight,
    // height: screenHeight,
    zIndex: 0,
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'orange',
    // marginHorizontal: 20,
    // height: screenHeight
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 42
  },
});

export default App;
