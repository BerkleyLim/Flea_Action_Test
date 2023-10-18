import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// CSS 꾸미기
const styles = StyleSheet.create({
  headerStyle : {
    border: 1,
    borderStyle: "solid",
    width:'100%',
    height:50
  },
  headerText : {
    // fontStyle: "italic",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,

    fontSize:20,
    justifyContent:'center',
    verticalAlign:'middle',
    // flex: '1 0 0'
  },
})

const MainHeader1 = () => {
  return (
    <View style={styles?.headerStyle}> 
      <Text style={styles?.headerText}>가로 스크롤 영역 #1</Text>
    </View>
  )
}

export default MainHeader1