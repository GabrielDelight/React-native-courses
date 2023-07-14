import {useEffect, useRef} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import CustomButton from '../utils/CustomButton';
export default function CameraScreen() {
  const devices = useCameraDevices();
  const device = devices.back;

  const camera = useRef(null);

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

      console.log(photo.path)
    
  }

  if (device == null)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  return (
    <View>
      <Text>Camera</Text>
      <Camera
        style={styes.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        ref={camera}
      />
    {/* <CustomButton onPess={() => console.warn("warning..")} color={"pink"} title="Capture" /> */}
    <Button onPress={onTakePhotoHandler} title='Snap' />
    </View>
  );
}

const styes = StyleSheet.create({
  absoluteFill: {
    width: 400,
    height: 500,
  },
});
