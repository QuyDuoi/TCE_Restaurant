import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {colors} from '../contants/hoaColors';

interface Props {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  flexDirection?: 'row' | 'column';
  styleContainer?: StyleProp<ViewStyle>;
  styleItemText?: StyleProp<TextStyle>;
  color?: string;
}
//PHU HOP VOI 2 OPTION CHO ROW
const RadioButtonComponent = (props: Props) => {
  const {
    options,
    selectedOption,
    onSelect,
    flexDirection,
    styleContainer,
    styleItemText,
    color,
  } = props;
  return (
    <View
      style={[
        {
          flexDirection: flexDirection ? flexDirection : undefined,
        },
        styleContainer,
      ]}>
      {options.map(option => (
        <TouchableOpacity
          activeOpacity={0.5}
          key={option}
          onPress={() => onSelect(option)}
          style={[styles.radioButton]}>
          <View
            style={[
              styles.radioButtonOuter,
              {
                borderColor: color ?? colors.black,
              },
            ]}>
            {selectedOption === option && (
              <View
                style={[
                  styles.radioButtonInner,
                  {
                    backgroundColor: color ?? colors.black,
                  },
                ]}></View>
            )}
          </View>
          <TextComponent
            text={option}
            styles={[
              styles.radioButtonText,
              {
                marginRight: flexDirection === 'row' ? 10 : 0,
              },
              styleItemText,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.red,
  },
  radioButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
  },
});

export default RadioButtonComponent;
