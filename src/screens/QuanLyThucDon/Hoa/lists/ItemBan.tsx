import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import TextComponent from '../components/TextComponent';
import RowComponent from '../components/RowComponent';
import {colors} from '../contants/hoaColors';

interface Props {
  name: string;
  capacity: number;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const ItemBan = (props: Props) => {
  const {name, capacity, onPress, styles} = props;
  //console.log(name.length);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View
        style={[
          {
            marginLeft: 5,

            paddingVertical: 5,
            marginBottom: 8,
          },
          styles,
        ]}>
        <RowComponent justify="flex-start">
          <TextComponent
            text={`${name.length == 1 ? 'Ban ' : ''}`}
            color={colors.black}
            fontWeight="bold"
            size={16}
          />
          <TextComponent
            text={`${name ? name : 'ngoai duong'}`}
            size={16}
            color={colors.black}
            fontWeight="bold"
          />
        </RowComponent>
        <TextComponent
          text={`Suc chua: ${capacity ? capacity : '100'} nguoi`}
          size={15}
          color={colors.desc}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ItemBan;
