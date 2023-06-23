import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {CustomButtonTYpes} from '../Types/Types';

interface Props {}
const CustomButton: React.FC<CustomButtonTYpes> = ({
  onClickHandler,
  title,color, newStyles
}): JSX.Element => {
  return (
    <Pressable
      onLongPress={onClickHandler}
      delayLongPress={200}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      android_ripple={{color: 'red'}}
      style={({pressed}) => [
        {backgroundColor: pressed ? 'white' : color},
        styles.button2,
        {...newStyles}
      ]}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button2: {
    width: 100,
    padding: 10,
    alignItems: 'center',
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomButton;
