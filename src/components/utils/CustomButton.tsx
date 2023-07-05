import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {CustomButtonTYpes} from '../../Types/Types';

import GlobalStyles from "./GlobaslStyles"
const CustomButton: React.FC<CustomButtonTYpes> = ({
  onPress,
  title,color, newStyles
}): JSX.Element => {
  return (
    <Pressable
      onPress={onPress}
      delayLongPress={200}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      android_ripple={{color: 'red'}}
      style={({pressed}) => [
        {backgroundColor: pressed ? 'white' : color},
        styles.button,
        {...newStyles}
      ]}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    padding: 10,
    alignItems: 'center',
    color: 'white',
    margin: 10
  
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomButton;
