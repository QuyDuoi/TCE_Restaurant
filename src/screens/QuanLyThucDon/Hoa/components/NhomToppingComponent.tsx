import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import TextComponent from './TextComponent';
import {colors} from '../contants/hoaColors';
import RowComponent from './RowComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpaceComponent from './SpaceComponent';
import ItemNhomTopping from '../lists/ItemNhomTopping';
import {NhomTopping} from '../modelTests/NhomTopping';

interface Props {
  searchQuery: string;
}

const modelTest: NhomTopping[] = [
  {
    id: 1,
    title: 'Chon nuoc dung',
    toppings: [
      {id: 1, name: 'Lau thai'},
      {id: 2, name: 'Lau thao moc'},
      {id: 3, name: 'Lau lau'},
      {id: 4, name: 'Lau thai'},
      {id: 5, name: 'Lau tao moc'},
      {id: 6, name: 'Lau lau'},
    ],
  },
  {
    id: 2,
    title: 'Chon nuoc dung',
    toppings: [
      {id: 4, name: 'Lau thai'},
      {id: 5, name: 'Lau thao moc'},
      {id: 6, name: 'Lau lau'},
      {id: 7, name: 'Lau thai'},
      {id: 8, name: 'Lau tao moc'},
      {id: 9, name: 'Lau lau'},
    ],
  },
  {
    id: 3,
    title: 'chon com',
    toppings: [
      {id: 10, name: 'com tam'},
      {id: 11, name: 'com rang'},
      {id: 12, name: 'com commm'},
    ],
  },
];

const NhomToppingComponent = (props: Props) => {
  const {searchQuery} = props;

  const filterData = modelTest.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View
      style={[
        hoaStyles.containerTopping,
        {
          backgroundColor: '#EAEAEA',
          alignSelf: 'center',
        },
      ]}>
      <RowComponent justify="flex-start" styles={{padding: 5}}>
        <SpaceComponent width={10} />
      </RowComponent>
      <FlatList
        data={filterData}
        renderItem={({item}: any) => <ItemNhomTopping nhomTopping={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default NhomToppingComponent;
