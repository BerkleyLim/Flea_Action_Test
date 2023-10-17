import React from 'react'
import { Text, View } from "react-native";


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

export default Header;