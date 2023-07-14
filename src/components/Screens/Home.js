import React, {useEffect, useState} from 'react';
import {Pressable, View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import GlobalFont from '../utils/GlobaslStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../utils/CustomButton';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';

import {useDispatch, useSelector} from 'react-redux';
import {setName, setAge, increaseAge, getCountries} from '../../redux/actions';
// import PushNotification from "react-native-push-notification";

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

  const {name, age, countries} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const onNavigateHandler = () => {
    navigation.navigate('About');
  };

  useEffect(() => {
    dispatch(getCountries());
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
          }
        });
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const handleNotification = (item, index) => {
    // navigation.navigate("Map")
    navigation.navigate("Map")
    // PushNotification.cancelAllLocalNotifications();

    // PushNotification.localNotification({
    //     channelId: "test-channel",
    //     title: "You clicked on " + item.country,
    //     message: item.city,
    //     bigText: item.city + " is one of the largest and most beatiful cities in " + item.country,
    //     color: "red",
    //     id: index
    // });

    // PushNotification.localNotificationSchedule({
    //     channelId: "test-channel",
    //     title: "Alarm",
    //     message: "You clicked on " + item.country + " 20 seconds ago",
    //     date: new Date(Date.now() + 20 * 1000),
    //     allowWhileIdle: true,
    // });
}


  return (
    <View style={styles.body}>
      <Text style={[GlobalFont.CustomFont, styles.text]}>Welcome d {name}</Text>
      <Text style={[GlobalFont.CustomFont, styles.text]}>Your are {age} !</Text>

      <CustomButton
        title="Visit about"
        onPress={onNavigateHandler}
        color="hotpink"
      />  
       <CustomButton
      title="Open camera"
      onPress={() => navigation.navigate("Camera")}
      color="hotpink"
    />

      <FlatList
      // horizontal
      inverted
        data={countries}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
            onPress={(item,index) => { handleNotification(item, index) }}
            >
            <View style={styles.countries_body}>
              <Text style={styles.country}>{item.country}</Text>
              <Text style={styles.city}>{item.city}</Text>
            </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Update"
        value={name}
        onChangeText={value => setName(value)}
      /> */}
      {/* <CustomButton title="UPDATE" color="green" onPress={updateUsername} />
      <CustomButton title="DELETE" color="red" onPress={deleteUsername} />
      <CustomButton
        title="Increase Age"
        color="blue"
        onPress={() => dispatch(increaseAge())}
      /> */}
      {/* <CustomButton
        title="LOG OUT AND CLEAR DATA"
        color="red"
        onPress={clearData}
      /> */}

      {/* <Text style={[ styles.text2]}>
        {route.params?.message}
      </Text> */}
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
  countries_body: {
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 10,
    margin: 10
  },
  country: {
    fontSize: 30,
    textAlign: "center"
  }
  , 
  city: {
    textAlign: "center"
  }

});
