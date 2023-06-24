import  React from 'react';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './components/Screens/Home';
import About from './components/Screens/About';
const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: 'About me',
            //  presentation: 'transparentModal'  // MakesStack appears as modal modal 
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {backgroundColor: "black"},
            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
