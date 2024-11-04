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
import TextComponent from './TextComponent';

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
  fontSize?: number;
  elevation?: number;
  type?: 'normal' | any;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoFocus?: boolean;
  readonly?: boolean;
  flex?: number;
  onPress?: () => void;
  paddingHorizontal?: number;
  borderRadius?: number;
  borderWidth?: number;
  bgrColor?: string;
  onSubmitEditing?: () => void;
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
    elevation,
    fontSize,
    type,
    keyboardType,
    autoFocus,
    readonly,
    flex,
    onPress,
    paddingHorizontal,
    borderRadius,
    borderWidth,
    bgrColor,
    onSubmitEditing,
  } = props;

  return type === 'normal' ? (
    <View style={[{flex: flex ?? undefined}]}>
      {leftIcon || rightIcon ? (
        <View style={[styles]}>
          <RowComponent justify="space-between" styles={[]} onPress={onPress}>
            {leftIcon && leftIcon}
            <TextInput
              style={[
                {
                  paddingVertical: 0,
                  color: colors.black,
                  borderRadius: borderRadius ? borderRadius : undefined,
                },
              ]}
              numberOfLines={numberOfLines ?? undefined}
              placeholder={placeholder ?? ''}
              placeholderTextColor={colors.desc}
              onChangeText={val => onChangeText(val)}
              value={value}
              keyboardType={keyboardType ?? 'default'}
              readOnly={readonly ?? false}
              onPress={onPress}
            />
            {rightIcon && rightIcon}
          </RowComponent>
        </View>
      ) : (
        <TextInput
          style={[
            {
              borderRadius: borderRadius ? borderRadius : undefined,
              fontSize: fontSize ? fontSize : undefined,
              color: colors.black,
            },
            styles,
          ]}
          numberOfLines={numberOfLines ?? undefined}
          placeholder={placeholder ?? ''}
          placeholderTextColor={colors.desc}
          onChangeText={val => onChangeText(val)}
          value={value}
          keyboardType={keyboardType ?? 'default'}
          autoFocus={autoFocus ?? false}
          readOnly={readonly ?? false}
          onSubmitEditing={onSubmitEditing ? onSubmitEditing : undefined}
        />
      )}
    </View>
  ) : (
    <View
      style={[
        {
          paddingHorizontal: paddingHorizontal ?? 15,
        },
      ]}>
      {/* / lay out cua input / */}
      <RowComponent
        styles={[
          hoaStyles.inputContainer,
          styles,
          {
            borderWidth: borderWidth ? borderWidth : undefined,
            borderColor: colors.desc2,
            backgroundColor: bgrColor ? bgrColor : colors.white,
            elevation: elevation ? elevation : 0,
          },
        ]}>
        {leftIcon ?? leftIcon}
        <View
          style={{
            flex: 1,
            paddingLeft: leftIcon ? 5 : 0,
          }}>
          <TextInput
            style={[{color: colors.black, fontSize: fontSize ?? undefined}]}
            placeholder={placeholder ?? ''}
            placeholderTextColor={colors.desc}
            onChangeText={val => onChangeText(val)}
            value={value}
            numberOfLines={numberOfLines}
            onSubmitEditing={onSubmitEditing ? onSubmitEditing : undefined}
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
