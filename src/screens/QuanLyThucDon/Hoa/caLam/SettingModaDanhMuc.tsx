import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import ModalComponent from '../components/ModalComponent';
import SectionComponent from '../components/SectionComponent';
import TitleComponent from '../components/TitleComponent';
import {colors} from '../contants/hoaColors';
import SpaceComponent from '../components/SpaceComponent';
import ButtonComponent from '../components/ButtonComponent';

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const SettingModaDanhMuc = (props: Props) => {
  const {visible, onClose} = props;
  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      stylesTitle={{fontSize: 15}}>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <ButtonComponent
          title="Them mon an"
          onPress={() => {
            console.log('them mon an');
          }}
          activeOpacity={0.2}
        />
        <SpaceComponent height={10} />
        <View style={styles.indicator} />
        <SpaceComponent height={15} />
        <ButtonComponent
          title="Them danh muc"
          onPress={() => {
            console.log('them danh muc');
          }}
          activeOpacity={0.2}
        />
        <SpaceComponent height={10} />
        <View style={styles.indicator} />
        <SpaceComponent height={15} />
        <ButtonComponent
          title="Sap xep danh muc"
          onPress={() => {
            console.log('sap xep danh muc');
          }}
          activeOpacity={0.2}
        />
        <SpaceComponent height={10} />
        <View style={styles.indicator} />
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderWidth: 1,
    color: colors.desc,
    width: '50%',
  },
});

export default SettingModaDanhMuc;
