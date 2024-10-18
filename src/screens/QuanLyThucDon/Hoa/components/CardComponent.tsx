import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {hoaStyles} from '../styles/hoaStyles';

interface Props {
  children: ReactNode;
  bgrColor?: string;
  styles?: StyleProp<ViewStyle>;
  evlation?: number;
  borderWidth?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  flex?: number;
}

const CardComponent = (props: Props) => {
  const {
    children,
    bgrColor,
    styles,
    evlation,
    borderWidth,
    onPress,
    onLongPress,
    flex,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress ? () => onLongPress() : undefined}
      style={{flex: flex ? flex : undefined}}
      activeOpacity={1}>
      <View
        style={[
          hoaStyles.card,
          {
            backgroundColor: bgrColor ? bgrColor : 'white',
            elevation: evlation ? evlation : 0,
            borderWidth: borderWidth ? borderWidth : 0,
          },
          styles,
        ]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default CardComponent;
