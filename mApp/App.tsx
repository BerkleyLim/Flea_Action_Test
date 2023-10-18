/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "react-native-gesture-handler";
import React from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Body from './src/page/component/Body'
import Header from './src/page/component/common/Header'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";

const queryClient = new QueryClient();

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
  // 코드 설명 : 아래는 NavigationContainer 설정하여 각각 스크린마다 이동 시 설정한다.
  // <QueryClientProvider client={queryClient}>
  //   <SafeAreaView>
  //     <Header></Header>
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="Body">
  //       {/* <Stack.Navigator> */}
  //         <Stack.Screen name="Body" component={Body} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </SafeAreaView>
  // </QueryClientProvider>
    // Provider Setting
    <QueryClientProvider client={queryClient}> 
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <Header></Header>
          <Body></Body>
        </ScrollView>
      </SafeAreaView>
    </QueryClientProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'orange',
    // marginHorizontal: 20,
  },
  text: {
    fontSize: 42
  }
});

export default App;
