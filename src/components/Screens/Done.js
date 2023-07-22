import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setTask, setTaskID} from '../../redux/actions';
import CustomFontBold from '../utils/GlobaslStyles';
import CheckBox from '@react-native-community/checkbox';

export default function Done({navigation}) {
  const {tasks} = useSelector(state => state.tasksReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getItems();
  }, []);

  console.log('==d=>', tasks);

  const getItems = () => {
    AsyncStorage.getItem('Tasks')
      .then(result => {
        const parsedTasks = JSON.parse(result);
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTask(parsedTasks));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        Alert.alert('Deleted', 'Alert deleted');
        dispatch(setTask(filteredTasks));
      })
      .catch(err => console.log(err));
  };

  const checkTask = async (id, newValue) => {
    let index = tasks.findIndex(task => task.ID === id);
    if (index > -1) {
      try {
        let newTask = [...tasks];
        newTask[index].Done = newValue;
        await AsyncStorage.setItem('Tasks', JSON.stringify(newTask));
        dispatch(setTask(newTask))
        Alert.alert('Success', 'Task updated successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      {/* Flay list */}
      <FlatList
        data={tasks.filter(task => task.Done === true)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Tasks');
            }}>
              <View style={[{backgroundColor: item.Color},styles.color_line]}>
              </View>
            <View>
              <CheckBox
                tintColors={{true: 'green'}}
                disabled={false}
                value={item.Done}
                onValueChange={newValue => checkTask(item.ID, newValue)}
              />
            </View>
            <View style={styles.relative_row}>
              <Text
                style={[CustomFontBold.CustomFontBold, styles.title]}
                numberOfLines={1}>
                {item.Title}
              </Text>
              <Text style={[CustomFontBold.CustomFont, styles.subtitle]}>
                {item.Description}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.trash}
              onPress={() => deleteTask(item.ID)}>
              <FontAwesome5Icon name="trash" color={'red'} size={25} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Create Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setTaskID(tasks.length + 1));
          navigation.navigate('Tasks');
        }}>
        <FontAwesome5Icon name="plus" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    // position: 'relative',
    backgroundColor: 'black',
    flex: 1,
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
    elevation: 5,
  },

  list: {
    marginHorizontal: 10,
    marginVertical: 7,
    backgroundColor: 'white',
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    color: 'black',
    margin: 5,
  },

  subtitle: {
    color: '#9a9a9a',
    margin: 5,
    fontSize: 20,
  },

  relative_row: {
    position: 'relative',
  },
  trash: {
    position: 'absolute',
    top: 29,
    right: 20,
  },

  color_line: {
    width: 20,
    height: 100,
    // backgroundColor: "#ddd",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  }
});
