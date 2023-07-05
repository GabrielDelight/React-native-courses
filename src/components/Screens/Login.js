import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button, StyleSheet, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({navigation}) {
  const [name, setName] = useState('');




  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    try {
      let uname = await AsyncStorage.getItem('username');
      if(uname!== null)
      navigation.navigate("Home") 
    } catch (error) {
      console.warn(error)
    }
  };

  const setData = async () => {
    if (name.length == 0) {
      return Alert.alert('Warning', 'Plase enter your data', [
        {
          text: "Don't show again",
          onPress: () => console.warn("Don't show again"),
        },
        {text: 'Cancel', onPress: () => console.log('Canceled was pressed')},
        {text: 'OK', onPress: () => console.warn('OK was pressed')},
      ]);
    } else {
      try {
        Alert.alert('Success', 'Redirecting to home');
        navigation.navigate('Home');
        await AsyncStorage.setItem('username', name);
        // console.warn('Hello');
      } catch (error) {
        console.log('Error', error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg',
        }}
      />

      <Text style={styles.text}>Async Storage</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setName(value)}
          placeholder="Enter your name"
          placeholderTextColor={'black'}
        />
        

      <CustomButton title="Login" color="hotpink" onPress={setData} />
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 39,
  },
  input: {
    borderColor: 'white',
    borderWidth: 2,
    padding: 10,
    color: '#000',
    margin: 10,
    width: 200,
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
});
