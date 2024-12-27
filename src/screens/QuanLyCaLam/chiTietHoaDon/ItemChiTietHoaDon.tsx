import {View, StyleSheet} from 'react-native';
import React from 'react';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';

interface Props {
  onLongPress: () => void;
  nameMonAn?: string;
  soLuong?: number;
  gia?: number;
}

const ItemChiTietHoaDon = (props: Props) => {
  const {onLongPress, nameMonAn, soLuong, gia} = props;
  return (
    <View>
      <View style={styles.container}>
        <RowComponent justify="space-between" styles={{paddingHorizontal: 8}}>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
            <TextComponent
              text={nameMonAn ?? 'Lẩu Vịt Măng Cay'}
              styles={styles.text}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
          <RowComponent
            onLongPress={onLongPress}
            styles={{alignItems: 'center'}}>
            <TextComponent
              text={soLuong?.toString() ?? '1'}
              styles={styles.text}
            />
          </RowComponent>
          <View style={{width: '23%', alignItems: 'center'}}>
            <TextComponent
              text={gia?.toLocaleString('vi-VN') ?? '100'}
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
  },
  indicator: {
    width: '100%',
    height: 1 * 1.5,
    backgroundColor: colors.desc2,
  },
});

export default ItemChiTietHoaDon;
