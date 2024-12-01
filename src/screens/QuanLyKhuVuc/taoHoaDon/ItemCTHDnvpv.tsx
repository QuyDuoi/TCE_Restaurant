import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  nameMonAn?: string;
  soLuong?: number;
  giaTien?: number;
  onLongPress?: () => void;
  trangThai?: boolean;
}

const ItemCTHDnvpv = (props: Props) => {
  const {nameMonAn, soLuong, giaTien, onLongPress, trangThai} = props;
  return (
    <View>
      <View style={styles.container}>
        <RowComponent justify="space-between" styles={{paddingHorizontal: 8}}>
          <View
            style={{
              width: '43%',
              alignItems: 'flex-start',
            }}>
            <TextComponent
              text={nameMonAn ? nameMonAn : 'com ga'}
              styles={styles.text}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
          <RowComponent
            onLongPress={onLongPress}
            styles={{
              alignItems: 'center',
              width: '10%',
              justifyContent: 'center',
            }}>
            <TextComponent
              text={soLuong?.toString() ? soLuong.toString() : '0'}
              styles={styles.text}
            />
          </RowComponent>
          <RowComponent
            styles={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '10%',
            }}>
            <Icon
              name={trangThai ? 'check' : 'close'}
              size={15}
              color={trangThai ? colors.status : colors.status2}
            />
          </RowComponent>
          <View
            style={{
              width: '23%',
              alignItems: 'center',
            }}>
            <TextComponent
              text={giaTien?.toString() ? giaTien.toString() : '0'}
              styles={styles.text}
            />
          </View>
        </RowComponent>
      </View>
      <View style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: colors.black,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  indicator: {
    width: '100%',
    height: 1 * 1.5,
    backgroundColor: colors.desc2,
  },
});

export default ItemCTHDnvpv;
