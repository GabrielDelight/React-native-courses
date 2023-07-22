import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useDispatch, useSelector} from 'react-redux';

export default function CameraScreen({navigation, route}) {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const {tasks, taskID} = useSelector(state => state.tasksReducer);
  console.log(taskID);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPermissionFunction() {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission =
        await Camera.requestMicrophonePermission();

      const devices = await Camera.getAvailableCameraDevices();
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      console.log(cameraPermission);
    }
    getPermissionFunction();
  }, []);

  const onTakePhotoHandler = async () => {
    const photo = await camera.current.takePhoto({
      flash: 'on',
    });

    updatePhoto(taskID, photo.path);
    console.log(photo.path);
  };

  const updatePhoto = (id, image) => {
    let index = tasks.findIndex(task => task.ID === route.params.id);
    if (index > -1) {
      let newTask = [...tasks];
      newTask[index].Image = image;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTask))
        .then(() => {
          Alert.alert('Success', 'Image set successful');
          
          navigation.goBack();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  if (device == null)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  return (
    <View>
      <Camera
        style={styles.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        ref={camera}
      />

      <TouchableOpacity style={styles.button} onPress={onTakePhotoHandler}>
        <FontAwesome5Icon name="camera" color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    width: '100%',
    height: '100%',
  },

  button: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 20,
    left: 160,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
