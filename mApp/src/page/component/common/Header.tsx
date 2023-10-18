import React from 'react'
import { StyleSheet, Text, View } from "react-native";


// CSS 꾸미기
const styles = StyleSheet.create({
  headerStyle : {
    backgroundColor: "yellow",
    border: 1,
    borderStyle: "solid",
    width:'100%',
    height:75
  },
  headerText : {
    fontStyle: "italic",
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
    textAlign:'center',
    fontSize:50,
    justifyContent:'center',
    // flex: '1 0 0'
  },
})


const Header = () => {
  return(
    <View style={styles?.headerStyle}>
      <Text style={styles?.headerText}>Header</Text>
    </View>
  )
}

export default Header;