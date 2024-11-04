import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {hoaStyles} from '../styles/hoaStyles';

interface Props {
  children: ReactNode;
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
  onLongPress?: () => void;
  activeOpacity?: number;
}

const RowComponent = (props: Props) => {
  const {children, justify, onPress, styles, onLongPress, activeOpacity} =
    props;

  return onPress || onLongPress ? (
    <TouchableOpacity
      style={[hoaStyles.row, {justifyContent: justify ?? undefined}, styles]}
      onPress={onPress ? () => onPress() : undefined}
      onLongPress={onLongPress ? () => onLongPress() : undefined}
      activeOpacity={activeOpacity ? activeOpacity : 0.7}>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[hoaStyles.row, {justifyContent: justify ?? undefined}, styles]}>
      {children}
    </View>
  );
};

export default RowComponent;
