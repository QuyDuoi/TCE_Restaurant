import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import {colors} from '../contants/hoaColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {hoaStyles} from '../styles/hoaStyles';

interface Props {
  styles?: StyleProp<ViewStyle>;
  nameCategory: string;
  quantityCurrent: number;
  totalFood: number;
  onPress?: () => void;
  isExpanded?: boolean;
}

const ItemDanhMuc = (props: Props) => {
  const {
    styles,
    nameCategory,
    quantityCurrent,
    totalFood,
    onPress,
    isExpanded,
  } = props;

  return (
    <View
      style={[
        styles,
        {
          paddingTop: 5,
        },
      ]}>
      <RowComponent
        onPress={onPress ? () => onPress() : undefined}
        justify="space-between"
        styles={{
          paddingHorizontal: 8,
          paddingVertical: 10,
        }}>
        <TextComponent
          text={nameCategory}
          color={colors.text}
          fontWeight="bold"
          size={16}
          opacity={0.9}
        />
        <RowComponent onPress={onPress ? () => onPress() : undefined}>
          <TextComponent
            text={`${quantityCurrent}/${totalFood}`}
            color={colors.status}
            fontWeight="bold"
            styles={{marginHorizontal: 10}}
            opacity={0.8}
          />
          <Icon
            name={isExpanded ? 'chevron-down' : 'chevron-right'}
            color={colors.status}
            size={14}
            style={{paddingTop: 3}}
          />
        </RowComponent>
      </RowComponent>
      <View
        style={[
          hoaStyles.indicator,
          {
            width: useWindowDimensions().width,
          },
        ]}
      />
    </View>
  );
};

export default ItemDanhMuc;
