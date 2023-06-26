import  React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';

const About = ({navigation}) => {
    const onNavigateHandler = () => {
      navigation.goBack();
    };
  
    return (
      <View style={styles.body}>
        <Text style={styles.text}>Screen 2</Text>
        <Text style={styles.text}>My name is Gabriel Delight</Text>
        <Pressable
          onPress={onNavigateHandler}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={({pressed}) => [
            {backgroundColor: pressed ? '#ddd' : 'hotpink'},
            styles.button,
          ]}>
          <Text style={styles.buttonText}>Go back!</Text>
        </Pressable>
      </View>
    );
  };

  export default About


  const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 25,
      color: '#000',
    },
    button: {
      padding: 10,
      margin: 10,
    },
    buttonText: {
      fontSize: 14,
      color: '#fff',
    },
  });