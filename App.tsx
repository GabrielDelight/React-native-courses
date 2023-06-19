import React, {useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';

function App(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([
    {key: 1, item: 1},
    {key: 2, item: 2},
    {key: 3, item: 3},
    {key: 4, item: 4},
    {key: 5, item: 5},
    {key: 6, item: 6},
    {key: 7, item: 7},
    {key: 8, item: 8},
    {key: 9, item: 9},
    {key: 10, item: 10},
    {key: 11, item: 11},
    {key: 12, item: 12},
    {key: 13, item: 13},
    {key: 14, item: 14},
    {key: 15, item: 15},
    {key: 16, item: 16},
    {key: 17, item: 17},
  ]);

  const onRefreshing = () => {
    setRefreshing(true);
    setItems([...items, {key: 18, item: 18}]);
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.body}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} colors={["#ff00ff", "red", "green"]} />
      }>
      {items.map(item => (
        <View style={styles.view}>
          <Text key={item.key} style={styles.text}>
            Item {item.item}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
  },
  view: {
    padding: 10,
    backgroundColor: 'cornflowerblue',
    margin: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
