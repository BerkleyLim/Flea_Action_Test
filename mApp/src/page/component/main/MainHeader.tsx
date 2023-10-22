import { Dimensions, StyleSheet, Text, View } from 'react-native'

// CSS 꾸미기
let screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  headerStyle : {
    border: 1,
    borderStyle: "solid",
    // width:'100%',
    height:50,
    width:screenWidth,
    // height:screenHeight
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

const MainHeader = ({children}:any) => {
  return (
    <View style={styles?.headerStyle}> 
      <Text style={styles?.headerText}>{children}</Text>
    </View>
  )
}

export default MainHeader