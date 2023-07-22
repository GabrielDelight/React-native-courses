import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTask, setTaskID} from '../../redux/actions';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import {Notifications} from 'react-native-notifications';


const Tasks = ({navigation}) => {
  const {tasks, taskID} = useSelector(state => state.tasksReducer);
  const dispatch = useDispatch();
  const [color, setColor] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);
  const [minutes, setMinutes] = useState(null);
  const [image, setImage] = useState('');
  const [id, setID] = useState('');
  const [showModal, setShowModal] = useState(false);

 

  const setTaskHandler = () => {
    if (title.length === 0) {
      return Alert.alert('Warning', 'Please add a title');
    }
    const taskData = {
      ID: taskID,
      Title: title,
      Description: description,
      Done: done,
      Color: color,
      Image: image,
    };

    const index = tasks.findIndex(task => task.ID === taskID);
    let newTask = [];
    if (index > -1) {
      newTask = [...tasks];
      newTask[index] = taskData;
    } else {
      newTask = [...tasks, taskData];
    }

    AsyncStorage.setItem('Tasks', JSON.stringify(newTask))
      .then(() => {
        dispatch(setTask(newTask));
        Alert.alert('Success', 'Task saved successfully');
        navigation.goBack();
       
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      findTask();
    })

    // Notifications.registerRemoteNotifications();

  //   Notifications.setNotificationChannel({
  //     channelId: 'my-channel',
  //     name: 'My Channel',
  //     importance: 5,
  //     description: 'My Description',
  //     enableLights: true,
  //     enableVibration: true,
  //     groupId: 'my-group', // optional
  //     groupName: 'My Group', // optional, will be presented in Android OS notification permission
  //     showBadge: true,
  //     soundFile: 'custom_sound.mp3',  // place this in <project_root>/android/app/src/main/res/raw/custom_sound.mp3
  //     vibrationPattern: [200, 1000, 500, 1000, 500],
  // })
   
  }, []);

 

  const findTask = () => {
    const getTask = tasks.find(task => task.ID === taskID);
    if (getTask) {
      setTitle(getTask.Title);
      setDescription(getTask.Description);
      setDone(getTask.Done);
      setID(getTask.ID);
      setImage(getTask.Image);
    }
  };

  const onToggleNofifyModalhandler = () => {
    setShowModal(!showModal);
  };
  console.log('image', image);

  const sendNotification = () => {
    console.log("Helllll")
    // Notifications.postLocalNotification({
    //   body: 'Local notification!',
    //   title: 'Local Notification Title',
    //   sound: 'chime.aiff',
    //   category: 'SOME_CATEGORY',
    //   link: 'localNotificationLink',
    //   fireDate: new Date() // only iOS
    // }, 5);
  }

  return (
    <ScrollView>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor={'white'}
          onChangeText={value => setTitle(value)}
          value={title}
        />
        <TextInput
          style={styles.input}
          multiline
          placeholder="Description"
          placeholderTextColor={'white'}
          onChangeText={value => setDescription(value)}
          value={description}
        />

        <View style={styles.color}>
          <TouchableOpacity
            style={styles.white}
            onPress={() => setColor('white')}>
            {color == 'white' && (
              <FontAwesome5Icon name="check" color={'black'} size={26} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orange}
            onPress={() => setColor('orange')}>
            {color == 'orange' && (
              <FontAwesome5Icon name="check" color={'black'} size={26} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cornflowerblue}
            onPress={() => setColor('cornflowerblue')}>
            {color == 'cornflowerblue' && (
              <FontAwesome5Icon name="check" color={'black'} size={26} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hotpink}
            onPress={() => setColor('hotpink')}>
            {color == 'hotpink' && (
              <FontAwesome5Icon name="check" color={'black'} size={26} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.bell_camera_container}>
          <TouchableOpacity
            style={styles.bell_container}
            onPress={() => navigation.navigate("Notification")}>
            <FontAwesome5Icon name="bell" color={'white'} size={27} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.camera_button}
            onPress={() => navigation.navigate('Camera', {id})}>
            <FontAwesome5Icon name="camera" color={'white'} size={27} />
          </TouchableOpacity>
        </View>

        {image ? (
          <Image style={{width: 200, height: 200}} source={{uri: 'file://' + image}}  />
        ) : null}

        <Modal
          visible={showModal}
          transparent
          hardwareAccelerated
          onRequestClose={onToggleNofifyModalhandler}>
          <View style={styles.modal_container}>
            <View style={styles.modal_wrapper}>
              <Text style={styles.text}>Remind Me After</Text>
              <TextInput
                style={styles.input_date}
                keyboardType={'number-pad'}
                maxLength={2}
                onChangeText={value => setMinutes(value)}
              />
              <Text style={styles.text}>Minute(s)</Text>

              <View style={styles.btttom_modal_buttons}>
                <TouchableOpacity
                  style={styles.cancel_button}
                  onPress={onToggleNofifyModalhandler}>
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ok_button}
                  onPress={sendNotification}>
                  <Text  style={styles.text}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.checkbox}>
          <CheckBox
            tintColors={{true: 'white'}}
            value={done}
            onValueChange={newValue => setDone(newValue)}
          />

          <Text style={styles.text}>Is Done</Text>
        </View>
        <CustomButton
          title="Save Task"
          color="green"
          newStyles={{width: '100%', padding: 10}}
          onPress={setTaskHandler}
        />
      </View>
    </ScrollView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  input: {
    width: '100%',
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: 'cornflowerblue',
    fontSize: 20,
    color: 'white',
    borderRadius: 5,
  },

  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkbox: {
    backgroundColor: 'cornflowerblue',
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  color: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'cornflowerblue',
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  white: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  orange: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornflowerblue: {
    flex: 1,
    backgroundColor: 'cornflowerblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotpink: {
    flex: 1,
    backgroundColor: 'hotpink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bell_camera_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bell_container: {
    width: '45%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cornflowerblue',
    marginVertical: 20,
    borderRadius: 10,
  },
  camera_button: {
    width: '45%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cornflowerblue',
    marginVertical: 20,
    borderRadius: 10,
  },
  modal_container: {
    flex: 1,
    backgroundColor: '#00000099',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_wrapper: {
    width: 250,
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  input_date: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 10,
    color: 'black',
    textAlign: 'center',
    fontSize: 26,
  },

  btttom_modal_buttons: {
    width: '100%',
    flexDirection: 'row',
  },
  cancel_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    padding: 10,
    borderBottomLeftRadius: 20,
  },
  ok_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    padding: 10,
    borderBottomRightRadius: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20,
  },
});
