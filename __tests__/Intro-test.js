import React from 'react';
import {Text, FlatList} from 'react-native';
import renderer from 'react-test-renderer';
import Intro from '../src/components/utils/Intro';

test('render correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Render Flatlist Correctly', () => {
  const tree = renderer.create(
    <FlatList
      data={['John', 'Mike', 'Jack']}
      keyExtractor={(item) => item}
      renderItem={({item}) => <Text>{item}</Text>}
    />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
});
