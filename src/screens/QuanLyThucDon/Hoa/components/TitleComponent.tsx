import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {colors} from '../contants/hoaColors';

interface Props {
  text: string;
  size?: number;
  color?: string;
  fontWeight?: 'normal' | 'bold';
  styles?: StyleProp<TextStyle>;
  opacity?: number;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  minHeight?: number;
}

const TitleComponent = (props: Props) => {
  const {
    text,
    size,
    color,
    fontWeight,
    styles,
    opacity,
    numberOfLines,
    ellipsizeMode,
    minHeight,
  } = props;
  return (
    <View>
      <Text
        style={[
          {
            fontSize: size ?? 16,
            color: color ?? colors.black,
            fontWeight: fontWeight ?? 'bold',
            minHeight: minHeight ?? 0,
            opacity: opacity ?? 1,
            flex: 0,
          },
          styles,
        ]}
        numberOfLines={numberOfLines ?? undefined}
        ellipsizeMode={ellipsizeMode ?? undefined}>
        {text}
      </Text>
    </View>
  );
};

export default TitleComponent;
