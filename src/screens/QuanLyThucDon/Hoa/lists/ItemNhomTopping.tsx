import {View, Text} from 'react-native';
import React from 'react';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import {colors} from '../contants/hoaColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpaceComponent from '../components/SpaceComponent';
import {Topping} from '../modelTests/Topping';
import {NhomTopping} from '../modelTests/NhomTopping';

interface Props {
  nhomTopping: NhomTopping;
}

const ItemNhomTopping = (props: Props) => {
  const {nhomTopping} = props;
  return (
    <View
      style={{
        marginBottom: 16,
      }}>
      <RowComponent
        onPress={() => console.log(`${nhomTopping.id}`)}
        justify="space-between"
        styles={{backgroundColor: '#FAFAFA'}}>
        <View
          style={{
            alignItems: 'flex-start',
            flex: 1,
            paddingLeft: 12,
            justifyContent: 'space-around',
            paddingVertical: 10,
          }}>
          <TextComponent
            text={nhomTopping.title}
            color={colors.text2}
            size={15}
          />
          <TextComponent
            text={nhomTopping.toppings.map(item => item.name).join(', ')}
            numberOfLines={1}
            ellipsizeMode="tail"
            color={colors.desc}
            size={15}
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
            paddingRight: 5,
          }}>
          <RowComponent>
            <TextComponent
              text={`${nhomTopping.toppings.length}/${nhomTopping.toppings.length}`}
              color={colors.desc}
              fontWeight="bold"
              styles={{marginHorizontal: 10}}
              opacity={0.9}
              size={15}
            />
            <Icon
              name={'chevron-right'}
              color={colors.desc}
              size={15}
              style={{paddingTop: 3}}
            />
          </RowComponent>
        </View>
      </RowComponent>
    </View>
  );
};

export default ItemNhomTopping;
