import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTask, setTaskID} from '../../redux/actions';

const Tasks = ({navigation}) => {
  const {tasks, taskID} = useSelector(state => state.tasksReducer);
  const dispatch = useDispatch();
  console.log(taskID);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const setTaskHandler = () => {
    if (title.length === 0) {
      return Alert.alert('Warning', 'Please add a title');
    }
    const taskData = {
      ID: taskID,
      Title: title,
      Description: description,
    };


    const index = tasks.findIndex((task) => task.ID === taskID)
    let newTask = []
    if(index > -1){
        newTask = [...tasks]
        newTask[index] = taskData
    }else {
        newTask = [...tasks, taskData]
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
    findTask();
  }, []);

  const findTask = () => {
    const getTask = tasks.find(task => task.ID === taskID);
    if(getTask){   
        setTitle(getTask.Title);
        setDescription(getTask.Description);
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={'black'}
        onChangeText={value => setTitle(value)}
        value={title}
      />
      <TextInput
        style={styles.input}
        multiline
        placeholder="Description"
        placeholderTextColor={'black'}
        onChangeText={value => setDescription(value)}
        value={description}
      />
      <CustomButton
        title="Save Task"
        color="green"
        newStyles={{width: '100%'}}
        onPress={setTaskHandler}
      />
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: 'cornflowerblue',
    fontSize: 20,
    color: 'black',
    borderRadius: 5,
  },
});
