import  React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
export default function Home({navigation}){
    const onNavigateHandler = () => {
      // navigation.openDrawer(); // Open side drawer
      // navigation.closeDrawer(); // Close side drawer
      navigation.toggleDrawer(); // Toffle drawer
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
          <Text style={styles.buttonText}>Toggle drawer</Text>
        </Pressable>
      </View>
    );
  };


  const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "black"
    },
    text: {
      fontSize: 25,
      color: '#000',
      color: "white"
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