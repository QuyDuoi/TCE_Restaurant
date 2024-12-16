import {View, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import CardComponent from '../../QuanLyThucDon/Hoa/components/CardComponent';

interface Props {
  item: any;
}

const ItemDanhSachOrder = (props: Props) => {
  const {item} = props;

  return (
    <View style={styles.container}>
      <RowComponent
        justify="space-between"
        styles={{
          borderBottomWidth: 1,
          borderColor: colors.desc2,
          borderStartWidth: 1,
          borderEndWidth: 1,
        }}>
        <View
          style={{
            width: '50%',
            alignItems: 'flex-start',
            paddingVertical: 10,
            borderRightWidth: 1,
            borderColor: colors.desc2,
          }}>
          <TextComponent
            text={item?.tenMon ?? 'com ga'}
            styles={[styles.text1, {paddingLeft: 8}]}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <TextComponent text={item?.soLuongMon ?? '1'} styles={styles.text1} />
        </View>
        <View
          style={{
            width: '32%',
            alignItems: 'center',
            paddingVertical: 10,
            borderLeftWidth: 1,
            borderColor: colors.desc2,
          }}>
          <CardComponent
            styles={{
              backgroundColor: colors.gray,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 12,
            }}>
            <TextComponent
              text={item?.giaMonAn ?? '100000'}
              color={colors.black}
            />
          </CardComponent>
        </View>
      </RowComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontSize: 15,
    color: colors.black,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  indicator: {
    width: '100%',
    height: 1 * 1.5,
    backgroundColor: colors.desc2,
  },
});

export default ItemDanhSachOrder;
