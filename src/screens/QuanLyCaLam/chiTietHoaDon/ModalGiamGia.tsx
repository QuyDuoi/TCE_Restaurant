import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import InputComponent from '../../QuanLyThucDon/Hoa/components/InputComponent';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';

const {height: MaxHeight} = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
  onValueChange?: (value: string) => void;
  onIsPercentChange?: (value: boolean) => void;
  discountValue?: string;
}

const ModalGiamGia = (props: Props) => {
  const {visible, onClose, onValueChange, onIsPercentChange, discountValue} =
    props;
  const [translateY] = useState(new Animated.Value(MaxHeight));

  const [discount, setDiscount] = useState(discountValue ? discountValue : '');
  const [isPercent, setIsPercent] = useState(
    discountValue ? (Number(discountValue) > 100 ? false : true) : true,
  );

  const openModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setDiscount(discountValue ? discountValue : '');
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: MaxHeight,
      duration: 350,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  useLayoutEffect(() => {
    if (visible) {
      openModal();
    }
  }, [visible]);

  const handlePress = (value: string) => {
    if (value === 'C') {
      setDiscount('');
    } else if (value === 'back') {
      setDiscount(prev => prev.toString().slice(0, -1));
    } else {
      setDiscount(prev => prev + value);
    }
  };

  const handleChangeMode = (value: boolean) => {
    setIsPercent(value);
  };

  useEffect(() => {
    if (isPercent) {
      if (Number(discount) > 100) {
        setDiscount('100');
      }
    }
  }, [discount]);

  const renderButton = ({
    label,
    value,
    style,
  }: {
    label: string;
    value: string;
    style?: any;
  }) => {
    return value === 'OK' ? (
      <TouchableOpacity
        style={[styles.buttonKeyboard, style]}
        onPress={() => {
          onValueChange && onValueChange(discount);
          onIsPercentChange && onIsPercentChange(isPercent);
          closeModal();
        }}
        activeOpacity={0.5}>
        <Text style={styles.buttonKeyboardText}>{label}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[styles.buttonKeyboard, style]}
        onPress={() => handlePress(value)}
        activeOpacity={0.5}>
        <Text style={styles.buttonKeyboardText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent visible={visible} animationType={'fade'}>
      <TouchableOpacity
        style={styles.containerOverPlay}
        activeOpacity={1}
        onPress={closeModal}
      />
      <Animated.View style={[styles.contentModal, {transform: [{translateY}]}]}>
        <SpaceComponent height={4} />
        <View
          style={{
            alignSelf: 'center',
            width: '92%',
            height: '98%',
          }}>
          <RowComponent justify="center">
            <TitleComponent text="Giảm giá" size={22} />
          </RowComponent>
          <SpaceComponent height={12} />
          {/* / lay out cua input / */}
          <RowComponent styles={{width: '100%'}}>
            <View
              style={{
                width: '25%',
                borderWidth: 1 * 1.5,
                borderTopStartRadius: 5,
                borderBottomLeftRadius: 5,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colors.desc,
              }}>
              <TextComponent
                text="Giảm"
                size={15}
                fontWeight="600"
                color={colors.desc}
              />
            </View>
            <View
              style={{
                flex: 1,
                borderLeftWidth: 0,
                borderRightWidth: 1 * 1.5,
                borderTopWidth: 1 * 1.5,
                borderBottomWidth: 1 * 1.5,
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                borderColor: colors.desc,
                backgroundColor: colors.white,
              }}>
              <InputComponent
                type={'normal'}
                placeholder={`${isPercent ? 'Nhập phần trăm giảm' : 'Nhập số tiền'}`}
                value={discount}
                onChangeText={val => handlePress(val)}
                styles={{
                  paddingVertical: 0,
                  height: 37,
                  paddingLeft: 10
                }}
                fontSize={16}
                readonly
              />
            </View>
          </RowComponent>
          {/* / end lay out input / */}

          <RowComponent
            styles={{
              marginVertical: 16,
            }}>
            <ButtonComponent
              //disabled={discount > 100}
              title="Giảm theo %"
              onPress={() => {
                handleChangeMode(true);
                setDiscount('');
              }}
              titleFontWeight="500"
              titleSize={14}
              boederWidth={1 * 1.5}
              borderColor={isPercent ? 'rgba(26, 173, 78, 1)' : colors.desc}
              boderRadius={5}
              titleColor={isPercent ? 'rgba(13, 110, 47, 1)' : colors.desc}
              styles={{
                padding: 6,
              }}
            />
            <ButtonComponent
              title="Giảm tiền"
              onPress={() => {
                handleChangeMode(false);
                setDiscount('');
              }}
              titleFontWeight="500"
              titleSize={14}
              styles={{marginLeft: 16, padding: 6}}
              boederWidth={1 * 1.5}
              borderColor={isPercent ? colors.desc : 'rgba(26, 173, 78, 1)'}
              boderRadius={5}
              titleColor={isPercent ? colors.desc : 'rgba(13, 110, 47, 1)'}
            />
          </RowComponent>

          {/* / lay out keyboard / */}
          <View style={styles.keyboard}>
            <View style={{width: '25%'}}>
              {renderButton({
                label: '1',
                value: '1',
                style: {borderTopStartRadius: 5},
              })}
              {renderButton({label: '4', value: '4', style: {}})}
              {renderButton({label: '7', value: '7', style: {}})}
              {renderButton({
                label: '0',
                value: '0',
                style: {
                  borderBottomWidth: 1 * 1.5,
                  borderBottomStartRadius: 5,
                },
              })}
            </View>
            <View style={{width: '25%'}}>
              {renderButton({label: '2', value: '2', style: {}})}
              {renderButton({label: '5', value: '5', style: {}})}
              {renderButton({label: '8', value: '8', style: {}})}
              {renderButton({
                label: '00',
                value: '00',
                style: {borderBottomWidth: 1 * 1.5},
              })}
            </View>
            <View style={{width: '25%'}}>
              {renderButton({label: '3', value: '3', style: {}})}
              {renderButton({label: '6', value: '6', style: {}})}
              {renderButton({label: '9', value: '9', style: {}})}
              {renderButton({
                label: '000',
                value: '000',
                style: {borderBottomWidth: 1 * 1.5},
              })}
            </View>
            <View style={{width: '25%'}}>
              {renderButton({
                label: 'C',
                value: 'C',
                style: {
                  borderRightWidth: 1 * 1.5,
                  borderTopEndRadius: 5,
                },
              })}
              {renderButton({
                label: '⌫',
                value: 'back',
                style: {borderRightWidth: 1 * 1.5},
              })}
              {renderButton({
                label: 'OK',
                value: 'OK',
                style: {
                  flex: 1,
                  borderRightWidth: 1 * 1.5,
                  borderBottomEndRadius: 5,
                  borderBottomWidth: 1 * 1.5,
                },
              })}
            </View>
          </View>
          {/*end lay out keyboard / */}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerOverPlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  contentModal: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonKeyboard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1 * 1.5,
    borderTopWidth: 1 * 1.5,
    height: 45,
    borderColor: colors.desc2,
  },
  buttonKeyboardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  keyboard: {
    flexDirection: 'row',
    width: '99%',
    alignSelf: 'center',
    marginBottom: 8,
  },
});

export default ModalGiamGia;
