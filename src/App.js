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
import {createDrawerNavigator} from '@react-navigation/drawer';

// const Tab = createBottomTabNavigator();
// const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'left', // Setting drawers position
          drawerType: 'slide',
          drawerStyle: {backgroundColor: 'cornflowerblue', width: 250},
          swipeEdgeWidth: 500, // Swipping almost from the middle of the screen
          drawerHideStatusBarOnOpen: true, // Hiding the OS Status bar
          overlayColor: '#00000090', // setting the opacity or background color  of the emty left side of the drawer
          swipeEnabled: true, // If set to false, it prevents user from swipping or pulling the draer from side
          headerTitleAlign: "center",
          headerStyle: {backgroundColor: "cornflowerblue"},
          headerTitleStyle: {fontSize: 25, fontWeight: "bold"},
          headerTintColor: "#fff",
          // header: () => false,
          drawerLabelStyle: {
            color: 'white',
            borderBottomWidth: 5,
            borderBottomColor: '#fff',
          },

        }}
        initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Feeds',
            drawerIcon: ({focused}) => <FontAwesome name='home' size={30} color={"#fff"} />
          }}
        />
        <Drawer.Screen
          name="About"
          component={About}
          options={{
            title: 'My About',
            drawerIcon: ({focused}) => <FontAwesome name='user' size={30} color={"#fff"} />

          }}
          initialParams={{firstName: "Gabriel", lastName: "Delight", age: 19}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
