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
import Body2 from './src/page/component/Body2'
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
  // <QueryClientProvider client={queryClient}>
  //   <NavigationContainer>
  //     {/* <Stack.Navigator initialRouteName="Body"> */}
  //     <Stack.Navigator>
  //       <Stack.Screen name="Body" component={Body} />
  //       {/* <Stack.Screen name="Body2" component={Body2} options={{ headerShown:false }}/> */}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // </QueryClientProvider>
    // Provider Setting
    <QueryClientProvider client={queryClient}> 
      <SafeAreaView>
        {/* <Header />  */}
        <Body></Body>
      </SafeAreaView>
    </QueryClientProvider>

  );
}

export default App;
