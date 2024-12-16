import {View, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';

interface Props {
  onLongPress: () => void;
  nameMonAn: string;
  soLuong: number;
  gia: number;
  id_monAn?: string;
}

const ItemChiTietHoaDonBMD = (props: Props) => {
  const {onLongPress, nameMonAn, soLuong, gia, id_monAn} = props;
  //console.log('id_monAn', id_monAn);

  return (
    <View>
      <View style={styles.container}>
        <RowComponent justify="space-between" styles={{paddingHorizontal: 8}}>
          <RowComponent styles={{width: '50%', alignItems: 'flex-start'}}>
            <TextComponent
              text={nameMonAn ?? 'com ga'}
              styles={styles.text}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </RowComponent>
          <RowComponent
            onLongPress={onLongPress}
            styles={{alignItems: 'center'}}>
            <TextComponent
              text={soLuong?.toString() ?? '-1'}
              styles={styles.text}
            />
          </RowComponent>
          <View style={{width: '23%', alignItems: 'center'}}>
            <TextComponent
              text={gia?.toString() ?? '100'}
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
    backgroundColor: 'white',
  },
  indicator: {
    width: '100%',
    height: 1 * 1.5,
    backgroundColor: colors.desc2,
  },
});

export default ItemChiTietHoaDonBMD;
