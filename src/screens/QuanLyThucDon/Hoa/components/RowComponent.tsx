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
}

const RowComponent = (props: Props) => {
  const {children, justify, onPress, styles} = props;

  return (
    <TouchableOpacity
      style={[hoaStyles.row, {justifyContent: justify ?? 'center'}, styles]}
      onPress={onPress ? () => onPress() : undefined}
      activeOpacity={1}>
      {children}
    </TouchableOpacity>
  );
};

export default RowComponent;
