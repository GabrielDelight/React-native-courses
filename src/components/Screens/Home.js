import  React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
export default function Home({navigation}){
    const onNavigateHandler = () => {
      navigation.navigate('About');
    };
    return (
      <View style={styles.body}>
        <Text style={styles.text}>Screen 1</Text>
        <Pressable
          onPress={onNavigateHandler}
          android_ripple={{color: 'red'}}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={({pressed}) => [
            {backgroundColor: pressed ? '#ddd' : 'hotpink'},
            styles.button,
          ]}>
          <Text style={styles.buttonText}>Visit About Me</Text>
        </Pressable>
      </View>
    );
  };


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