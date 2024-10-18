import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {hoaStyles} from '../styles/hoaStyles';

interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const SectionComponent = (props: Props) => {
  const {children, styles} = props;
  return <View style={[hoaStyles.section, styles]}>{children}</View>;
};

export default SectionComponent;
