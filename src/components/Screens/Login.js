import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button, StyleSheet, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);',
      );
    });
  };

  const getData = async () => {
    try {
      // let userData = await AsyncStorage.getItem('userData');
      // if (userData !== null) navigation.navigate('Home');
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT Name, Age FROM Users", 
          [],
          (tx, results) => {
            let len =  results.rows.length
            if(len > 0){
              navigation.navigate('Home');
            }
          }
        )
      })

    } catch (error) {
      console.warn(error);
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

        // const uData = {
        //   username: name,
        //   age,
        // };
        // await AsyncStorage.setItem('userData', JSON.stringify(uData));

        await db.transaction(async (tx) => {
          // await tx.executeSql(
          //     "INSERT INTO Users (Name, Age) VALUES ('" + name + "'," + age + ")"
          // );
          await tx.executeSql(
              "INSERT INTO Users (Name, Age) VALUES (?,?)",
              [name, age]
          );
      })

        navigation.navigate('Home');
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

      <Text style={styles.text}>SQLite Storage</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => setName(value)}
        placeholder="Enter your name"
        placeholderTextColor={'black'}
      />

      <TextInput
        style={styles.input}
        onChangeText={value => setAge(value)}
        placeholder="Enter your age"
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
    fontSize: 28,
  },
});
