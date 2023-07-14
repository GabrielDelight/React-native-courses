import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalFont from '../utils/GlobaslStyles';
const Map = () => {
  return (
    <View style={styles.body}>
      <Text style={[GlobalFont.CustomFont, styles.text]}>Welcome </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 45,
    color: '#000',
    color: 'white',
  },
});

export default Map;
