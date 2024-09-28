import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
  styles?: StyleProp<ViewStyle>;
}

const SpaceComponent = (props: Props) => {
  const {styles, width, height} = props;

  return (
    <View
      style={[
        styles,
        {
          width: width,
          height: height,
        },
      ]}
    />
  );
};

export default SpaceComponent;
