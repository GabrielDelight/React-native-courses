import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Home from './components/Screens/Home';
import About from './components/Screens/About';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Text} from 'react-native-paper';

// const Tab = createBottomTabNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name == 'Home') {
              iconName = 'home';
            }
            if (route.name == 'About') {
              iconName = 'user';
            }
            color = focused ? 'hotpink' : '#fff';
            size = 20;

            return <FontAwesome name={iconName} size={size} color={color} />;
          },

          tabBarActiveBackgroundColor: '#ddd', // Setting active background color
          tabBarInactiveBackgroundColor: '#fff', // Setting inactive background color

          // tabBarStyle: { backgroundColor: 'cornflowerblue' } ,
          tabBarShowIcon: false, // show or hide icon

          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: 'cornflowerblue',
          }, // Setting styles for label text
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            title: 'About me',
            //  presentation: 'transparentModal'  // MakesStack appears as modal modal
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {backgroundColor: 'black'},
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
