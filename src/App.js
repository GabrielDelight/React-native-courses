import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './components/Screens/Home';
import About from './components/Screens/About';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Login from './components/Screens/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen 
          name='Login'
          component={Login}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Feeds',
            drawerIcon: ({focused}) => (
              <FontAwesome name="home" size={30} color={'#fff'} />
            ),
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: 'My About',
            drawerIcon: ({focused}) => (
              <FontAwesome name="user" size={30} color={'#fff'} />
            ),
          }}
          initialParams={{firstName: 'Gabriel', lastName: 'Delight', age: 19}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
