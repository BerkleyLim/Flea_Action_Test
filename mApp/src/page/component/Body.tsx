import React from 'react'
import { Button, Text, View } from 'react-native';
import Header from './common/Header'

const Body = () => {
  // const result = useQuery('posts', postData);
  // const { data, error, isLoading } = result;

  // if (isLoading) return <Component>...</Component>;
  // if (error) return <Component>...</Component>;

  return (
    <View>
      <Header></Header>
      <Text>안녕</Text>
      <Button title={"hi"} 
          // onPress=}
      ></Button>
    </View>
  )
}

export default Body;