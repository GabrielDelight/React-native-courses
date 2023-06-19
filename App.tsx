import React from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';

function App(): JSX.Element {
  return (
    <View style={styles.body}>
      <View style={styles.row1}>
        <View style={styles.view1}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text}>2</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text}>3</Text>
        </View>
      </View>

      {/* send View */}
      <View style={styles.row2}>
        <View style={styles.view4}>
          <Text style={styles.text}>4</Text>
        </View>
        <View style={styles.view5}>
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      {/* Thord View */}
      <View style={styles.row3}>
        <View style={styles.view6}>
          <Text style={styles.text}>6</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text}>7</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // Rows section
  row1: {
    // flex: 1,
    flexDirection: 'row',
  },

  row2: {
    flexDirection: 'column',
  },

  row3: {
    flexDirection: 'row',
    flex: 1
  },
  // View section
  view1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  view2: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  view3: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hotpink',
  },
  view4: {
    // flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  view5: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
  view6: {
    backgroundColor: 'cornflowerblue',
    alignItems: 'stretch',
    justifyContent: "center",
    flex: 1,
  },
  view7: {
    backgroundColor: 'blue',
    alignItems: 'stretch',
    justifyContent: "center",
    flex: 1,
  },

  text: {
    textAlign: 'center',
    fontSize: 30,
    // margin: 10,
  },
});

export default App;
