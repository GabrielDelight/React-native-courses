import React, {useEffect, useState} from 'react';
import {Pressable, View, Text, StyleSheet, Alert} from 'react-native';
import GlobalFont from '../utils/GlobaslStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../utils/CustomButton';
import {TextInput} from 'react-native-gesture-handler';

export default function Home({navigation, route}) {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');

  const onNavigateHandler = () => {
    navigation.navigate('About');
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      let rawData =  await AsyncStorage.getItem('userData')
      console.log(rawData)
      let userData = JSON.parse(rawData)
      if (userData?.username !== null && userData?.age !== null) {
        setUsername(userData?.username);
        setAge(userData?.age);
      } else navigation.navigate('Login');
    } catch (error) {
      console.warn(error);
    }
  };

  const updateUsername = async () => {
    try {
      await AsyncStorage.mergeItem('userData', JSON.stringify({
        username,
      }));
      Alert.alert('Successs', 'Username updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUsername = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalFont.CustomFont, styles.text]}>
        Welcome {username}
      </Text>
      <Text style={[GlobalFont.CustomFont, styles.text]}>
        Your are {age} !
      </Text>

      <CustomButton
        title="Visit about"
        onPress={onNavigateHandler}
        color="hotpink"
      />
      <TextInput
        style={styles.input}
        placeholder="Update"
        value={username}
        onChangeText={value => setUsername(value)}
      />
      <CustomButton title="UPDATE" color="green" onPress={updateUsername} />
      <CustomButton title="LOG OUT" color="red" onPress={deleteUsername} />
      <CustomButton
        title="LOG OUT AND CLEAR DATA"
        color="red"
        onPress={clearData}
      />

      <Text style={[GlobalFont.CustomFont, styles.text2]}>
        {route.params?.message}
      </Text>
    </View>
  );
}

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
  text2: {
    fontSize: 55,
    color: '#000',
    color: 'white',
  },
  button: {
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
  input: {
    borderWidth: 2,
    borderColor: '#fff',
    width: 200,
    textAlign: 'center',
    margin: 10,
  },
});
