/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import type {PropsWithChildren} from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {
  Button,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { ThemeProvider } from '@react-navigation/native';


const headerText = {
  // fontStyle: "italic",
  // fontWeidht: "bold"
  fontSize:10,
}

const headerStyle ={
  backgroundColor: "yellow",
}

const Header = () => {
  return(
    <View style={headerStyle}>
      <Text style={headerText}>텍스트</Text>
      <Text style={headerText}>텍스트</Text>
    </View>
  )
}

const Body = () => {
  // const result = useQuery('posts', postData);
  // const { data, error, isLoading } = result;

  // if (isLoading) return <Component>...</Component>;
  // if (error) return <Component>...</Component>;

  return (
    <View>
      <Button title={"hi"} 
          // onPress=}
      ></Button>
    </View>
  )
}

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    // Provider Setting
    <QueryClientProvider client={queryClient}> 
      <SafeAreaView>
        <Header />
        <Body></Body>
      </SafeAreaView>
    </QueryClientProvider>

  );
}

export default App;
