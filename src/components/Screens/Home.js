import React, {useEffect, useState} from 'react';
import {Pressable, View, Text, StyleSheet, Alert} from 'react-native';
import GlobalFont from '../utils/GlobaslStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../utils/CustomButton';
import {TextInput} from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';

import {useDispatch, useSelector} from 'react-redux';
import {setName, setAge, increaseAge} from '../../redux/actions';

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

export default function Home({navigation, route}) {
  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const onNavigateHandler = () => {
    navigation.navigate('About');
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let uname = results.rows.item(0).Name;
            let age = results.rows.item(0).Age;
            // setName(name)
            // setAge(age)
            dispatch(setName(uname));
            dispatch(setAge(age));

            console.warn(results);
          }
        });
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const updateUsername = async () => {
    try {
      // await AsyncStorage.mergeItem(
      //   'userData',
      //   JSON.stringify({
      //     name,
      //   }),
      // );

      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Users SET Name=?',
          [name],
          () => {
            Alert.alert('Success!', 'Your data has been updated.');
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUsername = async () => {
    try {
      // await AsyncStorage.removeItem('userData');
      // navigation.navigate('Login');

      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          () => {
            navigation.navigate('Login');
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const clearData = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     navigation.navigate('Login');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={styles.body}>
      <Text style={[GlobalFont.CustomFont, styles.text]}>Welcome {name}</Text>
      <Text style={[GlobalFont.CustomFont, styles.text]}>Your are {age} !</Text>

      <CustomButton
        title="Visit about"
        onPress={onNavigateHandler}
        color="hotpink"
      />
      <TextInput
        style={styles.input}
        placeholder="Update"
        value={name}
        onChangeText={value => setName(value)}
      />
      <CustomButton title="UPDATE" color="green" onPress={updateUsername} />
      <CustomButton title="DELETE" color="red" onPress={deleteUsername} />
      <CustomButton
        title="Increase Age"
        color="blue"
        onPress={() => dispatch(increaseAge())}
      />
      {/* <CustomButton
        title="LOG OUT AND CLEAR DATA"
        color="red"
        onPress={clearData}
      /> */}

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
