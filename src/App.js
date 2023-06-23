import * as React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Screen1 = ({navigation}) => {
  const onNavigateHandler = () => {
    navigation.navigate('About');
  };
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen 1</Text>
      <Pressable
        onPress={onNavigateHandler}
        android_ripple={{color: 'red'}}
        style={({pressed}) => [
          {backgroundColor: pressed ? '#ddd' : 'hotpink'},
          styles.button,
        ]}>
        <Text style={styles.buttonText}>Visit About Me</Text>
      </Pressable>
    </View>
  );
};

const Screen2 = ({navigation}) => {
  const onNavigateHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen 2</Text>
      <Text style={styles.text}>My name is Gabriel Delight</Text>
      <Pressable
        onPress={onNavigateHandler}
        style={({pressed}) => [
          {backgroundColor: pressed ? '#ddd' : 'hotpink'},
          styles.button,
        ]}>
        <Text style={styles.buttonText}>Go back!</Text>
      </Pressable>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Screen1}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="About"
          component={Screen2}
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

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    color: '#000',
  },
  button: {
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
});
