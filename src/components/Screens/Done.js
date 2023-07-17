

import React from "react";
import { View, Text, StyleSheet } from "react-native"

export default function Done(){
  return <View style={styles.body}>
    <Text style={styles.text}>Done </Text>
  </View>
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1
  },
  text: {
    fontSize: 40,
    textAlign: "center"
  }
})