import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {colors} from '../contants/hoaColors';

interface Props {
  onPress: () => void;
  title: string;
  boderRadius?: number;
  styles?: StyleProp<ViewStyle>;
  bgrColor?: string;
  titleColor?: string;
  titleSize?: number;
  evalation?: number;
  borderColor?: string;
  boederWidth?: number;
  disabled?: boolean;
  activeOpacity?: number;
  titleFontWeight?:
    | 'normal'
    | 'bold'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

const ButtonComponent = (props: Props) => {
  const {
    onPress,
    title,
    boderRadius,
    styles,
    titleColor,
    bgrColor,
    titleSize,
    evalation,
    borderColor,
    boederWidth,
    disabled,
    activeOpacity,
    titleFontWeight,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity ? activeOpacity : 0.8}
      disabled={disabled ? disabled : false}
      style={[
        {
          backgroundColor: bgrColor ? bgrColor : colors.white,
          borderRadius: boderRadius ? boderRadius : 0,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: evalation ? evalation : 0,
          borderColor: borderColor ? borderColor : colors.desc,
          borderWidth: boederWidth ? boederWidth : 0,
        },
        styles,
      ]}>
      <View>
        <TextComponent
          text={title}
          color={titleColor ? titleColor : colors.black}
          fontWeight={titleFontWeight ? titleFontWeight : 'bold'}
          size={titleSize ? titleSize : 18}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
