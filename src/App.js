import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import About from './components/Screens/About';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Splash from './components/Screens/Splash';

import {Provider} from 'react-redux';
import {Store} from './redux/store';
import Map from './components/Screens/Map';
import CameraScreen from './components/Screens/Camera';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Done from './components/Screens/Done';
import ToDo from './components/Screens/ToDo';
import Tasks from './components/Screens/Tasks';
import NotificationScreen from './components/Screens/Notification';

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let IconName;
          if (route.name == 'To-do') IconName = 'yin-yang';
          if (route.name == 'Done') IconName = 'check-circle';

          return <FontAwesome name={IconName} color={color} size={size} />;
        },

        tabBarActiveTintColor: 'cornflowerblue',
        tabBarInactiveTintColor: '#ddd',
        tabBarActiveBackgroundColor: '#ddd',
        tabBarLabelStyle: {fontSize: 14},
        header: () => false
      })}>
      <Tab.Screen name="To-do" component={ToDo} />
      <Tab.Screen name="Done" component={Done} />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: "cornflowerblue",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "bold"
            }
          }}
        >
          <RootStack.Screen
            name="Splash"
            component={Splash}
            options={{
              header: () => null,
            }}
          />
          <RootStack.Screen name="My Tasks"  component={HomeTabs} />
          <RootStack.Screen name="Tasks" component={Tasks} />
          <RootStack.Screen name="Camera" component={CameraScreen} />
          <RootStack.Screen name="Notification" component={NotificationScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
