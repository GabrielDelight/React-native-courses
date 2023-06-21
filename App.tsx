import React, {useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const onClickHandler = () => {
    if (name.length > 3) {
      setSubmitted(!submitted);
    } else {
      setModalVisibility(true);
    }
  };
  return (
    <View style={styles.body}>
      <Modal
        visible={modalVisibility}
        transparent
        onRequestClose={() => setModalVisibility(false)}>
        <View style={styles.view_modal}>
          <View style={styles.view_wrapper}>
            <View style={styles.view_warning}>
              <Text style={styles.view_warning_text}>Warning</Text>
            </View>
            <View style={styles.message}>
              <Text style={styles.emessage_text}>
                Your name must be at least 3 characters long
              </Text>
            </View>
            <Text>
              <Pressable style={styles.pressable_button} 
              onPress={() => setModalVisibility(false)}
              android_ripple={{color: "white"}}

              >
                <Text style={styles.pressable_button_text}>OK</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </Modal>
      <Text style={styles.text}>Enter your name:</Text>
      <TextInput
        placeholder="eg: gabriel"
        style={styles.input}
        onChangeText={value => setName(value)}
        secureTextEntry={false}
        keyboardType={'default'}
      />

      <Pressable
        onLongPress={onClickHandler}
        delayLongPress={200}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        android_ripple={{color: 'red'}}
        style={({pressed}) => [
          {backgroundColor: pressed ? 'white' : 'green'},
          styles.button2,
        ]}>
        <Text style={styles.buttonText}>{!submitted ? 'Show' : 'Clear'}</Text>
      </Pressable>

      {submitted ? (
        <Text style={styles.text}>You are registered as {name}</Text>
      ) : null}
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    fontSize: 20,
    borderWidth: 2,
    width: 200,
    padding: 10,
    margin: 10,
  },
  button: {
    backgroundColor: 'cornflowerblue',
    width: 100,
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button2: {
    width: 100,
    padding: 10,
    alignItems: 'center',
    color: 'white',
  },
  view_modal: {
    backgroundColor: '#000000a8',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_wrapper: {
    width: 300,
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  view_warning: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  view_warning_text: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  message: {
    padding: 10,
  },
  emessage_text: {
    textAlign: 'center',
    fontSize: 20,
  },
  pressable_button: {
    backgroundColor: 'cornflowerblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10

  },
  pressable_button_text: {
    padding: 10,
    color: "white",

  },
});

export default App;
