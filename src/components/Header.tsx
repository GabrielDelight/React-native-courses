import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HeaderComponent = () => {
  return (
    <View style={styles.view}>
    <Text style={styles.text}>Registration Page</Text>
    </View>
  )
}

const styles  = StyleSheet.create({
    view: {
        backgroundColor: "cornflowerblue",
        width: "100%",
        padding: 10,
        display: 'flex',
        textAlign: "center",
        justifyContent: "center"
    },
    text: {
        color: "#fff",
        textAlign: "center"
    }
})
export default HeaderComponent