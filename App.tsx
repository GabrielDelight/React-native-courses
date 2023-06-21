import React, {useState} from 'react';
import {
  Alert,
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

  const onClickHandler = () => {
    if (name.length > 3) {
      setSubmitted(!submitted);
    } else {
      // Alert.alert(
      //   'Warning',
      //   'Your name must be at least 3 characters long',
      //   [
      //     {
      //       text: "Don't show again",
      //       onPress: () => console.warn("Don't show again"),
      //     },
      //     {text: 'Cancel', onPress: () => console.log('Canceled was pressed')},
      //     {text: 'OK', onPress: () => console.warn('OK was pressed')},
      //   ],
      //   {cancelable: true, onDismiss: () => console.log('Alert dismissed')},
      // );

      ToastAndroid.show(
        'Your name must be at least 3 characters long',
        ToastAndroid.LONG,
      );

      ToastAndroid.showWithGravity(
        'Your name must be at least 3 characters long',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );


      ToastAndroid.showWithGravityAndOffset(
        'Your name must be at least 3 characters long',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,0
        
      );
    }
  };
  return (
    <View style={styles.body}>
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
});

export default App;
