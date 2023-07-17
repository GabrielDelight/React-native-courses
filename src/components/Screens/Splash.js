import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';

import GlobaslStyles from '../utils/GlobaslStyles';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('My Tasks');
    }, 2000);
  }, []);

  return (
    <View style={styles.body}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://logos.flamingtext.com/City-Logos/Todo-Logo.png',
        }}
      />

      <Text style={[GlobaslStyles.CustomFontBold, styles.text]}>
        By Gabriel Delight
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'cornflowerblue',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 39,
  },
});
