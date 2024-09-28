import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {ReactNode} from 'react';
import RowComponent from './RowComponent';
import {hoaStyles} from '../styles/hoaStyles';
import {colors} from '../contants/hoaColors';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  allowClear?: boolean;
  numberOfLines?: number;
  styles?: StyleProp<ViewStyle>;
  styleIconX?: StyleProp<ViewStyle>;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChangeText,
    placeholder,
    rightIcon,
    leftIcon,
    allowClear,
    numberOfLines,
    styles,
    styleIconX,
  } = props;

  return (
    <View style={[{paddingHorizontal: 15}]}>
      <RowComponent styles={[hoaStyles.inputContainer, styles]}>
        {leftIcon ?? leftIcon}
        <View
          style={{
            flex: 1,
            paddingLeft: leftIcon ? 5 : 0,
          }}>
          <TextInput
            style={[{color: colors.black}]}
            placeholder={placeholder ?? ''}
            placeholderTextColor={colors.desc}
            onChangeText={val => onChangeText(val)}
            value={value}
            numberOfLines={numberOfLines}
          />
        </View>
        {rightIcon ?? rightIcon}
        {allowClear && value && (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            style={[styleIconX]}>
            <Icon name="close" size={17} color={colors.desc} />
          </TouchableOpacity>
        )}
      </RowComponent>
    </View>
  );
};

export default InputComponent;
