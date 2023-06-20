import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [name, setName] = useState<string>('');
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Enter your name:</Text>
      <TextInput
        placeholder="eg: gabriel"
        style={styles.input}
        onChangeText={value => setName(value)}
        secureTextEntry={false}
        keyboardType={"default"}
        maxLength={2}
      />
      <Text style={styles.text}>Your name is {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  view: {
    padding: 10,
    backgroundColor: 'cornflowerblue',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    // color: 'white',
  },

  input: {
    fontSize: 20,
    borderWidth: 2,
    width: 200,
    padding: 10,
  },
});

export default App;
