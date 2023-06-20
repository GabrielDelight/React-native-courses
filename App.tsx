import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [DATA, setDATA] = useState([
    {
      title: 'Title 1',
      data: ['Item 1-1', 'Item 1-2', 'Item 1-3'],
    },
    {
      title: 'Title 2',
      data: ['Item 2-1', 'Item 2-2', 'Item 2-3'],
    },
    {
      title: 'Title 3',
      data: ['Item 3-1', 'Item 3-2', 'Item 3-3'],
    },
    {
      title: 'Title 4',
      data: ['Item 4-1', 'Item 4-2'],
    },
  ]);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefrshHandler = () => {
    setRefreshing(true);
    setDATA([...DATA,   {
      title: `Title ${DATA.length + 1}`,
      data: [`items ${DATA.length + 1}-1`, `items ${DATA.length + 1}-2`]
    } ]);

    setRefreshing(false);
  };

  return (
    <SectionList
    inverted
    keyExtractor={(item, index) => index.toString()}
      sections={DATA}
      renderItem={({item}) => (
        <View>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({section}) => (
        <View style={styles.view}>
          <Text style={styles.text}>{section.title}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefrshHandler}
          colors={['red']}
        />
      }
    />

    // <FlatList
    //   // horizontal
    //   // inverted
    //   keyExtractor={(item, index) => index.toString()}
    //   data={items}
    //   renderItem={({item}) => (
    //     <View style={styles.view}>
    //       <Text style={styles.text}>{item.name}</Text>
    //     </View>
    //   )}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={false}
    //       onRefresh={onRefrshHandler}
    //       colors={['red']}
    //     />
    //   }
    // />

    // <ScrollView
    //   style={styles.body}
    //   refreshControl={
    //     <RefreshControl
    //     refreshing={refreshing}
    //     onRefresh={onRefrshHandler}
    //     />
    //   }
    //   >
    //   {items.map(item => (
    //     <View style={styles.view}>
    //       <Text key={item.key} style={styles.text}>
    //         Item {item.item}
    //       </Text>
    //     </View>
    //   ))}
    // </ScrollView>
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
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    // color: 'white',
  },
});

export default App;
