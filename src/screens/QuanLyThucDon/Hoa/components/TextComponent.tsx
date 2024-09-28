import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import {colors} from '../contants/hoaColors';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';

interface Props {
  text: string;
  size?: number;
  color?: string;
  fontWeight?: 'normal' | 'bold';
  styles?: StyleProp<TextStyle>;
  opacity?: number;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const TextComponent = (props: Props) => {
  const {
    text,
    size,
    color,
    fontWeight,
    styles,
    opacity,
    numberOfLines,
    ellipsizeMode,
  } = props;

  return (
    <View>
      <Text
        numberOfLines={numberOfLines ?? undefined}
        ellipsizeMode={ellipsizeMode ?? undefined}
        style={[
          hoaStyles.text,
          {
            fontSize: size ?? 14,
            color: color ?? colors.text,
            fontWeight: fontWeight ?? 'normal',
            minHeight: 28,
            opacity: opacity ?? 1,
            flex: 0,
          },
          styles,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default TextComponent;
