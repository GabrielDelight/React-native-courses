import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Linking} from 'react-native';

function App(): JSX.Element {
  const [counter, setCounter] = useState(0);
  const onChangeHandler = () => {
    setCounter(prevState => (prevState += 5));
  };
  const onResetHandler  = () => {
    setCounter(0)
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>{counter}</Text>
      <Text style={styles.button}>
      <Button title="Add" onPress={onChangeHandler} ></Button>
      </Text>
      <Text style={styles.text}>You clicked {counter} times</Text>
      <Button title='Reset' onPress={onResetHandler}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
    color: "white",
    justifyContent: 'center',
    alignItems: "center"
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  button: {
    marginBottom: 10
  }
});

export default App;
