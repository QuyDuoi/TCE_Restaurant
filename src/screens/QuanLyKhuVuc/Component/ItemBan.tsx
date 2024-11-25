import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';

interface Props {
  name: string;
  capacity: number;
  maQRCode: string; // URL QR code nhận từ backend
  onPress?: () => void;
}

const ItemBan = (props: Props) => {
  const {name, capacity, maQRCode, onPress} = props;

  return (
    <TouchableOpacity
      style={styles.itemBan}
      onPress={onPress}
      activeOpacity={0.6}>
      <View style={styles.row}>
        {/* Hiển thị hình ảnh QR code */}
        {maQRCode ? (
          <Image
            source={{
              uri: maQRCode,
            }}
            style={styles.qrImage}
          />
        ) : (
          <Image
            style={styles.imageNoQR}
            source={require('../../../image/QRCode.jpg')}
          />
        )}

        {/* Thông tin bàn */}
        <View style={styles.ttban}>
          <RowComponent justify="flex-start">
            <TextComponent
              text={`${name.length == 1 ? 'Bàn ' : ''}`}
              color={colors.black}
              fontWeight="bold"
              size={16}
            />
            <TextComponent
              text={`${name ? name : 'Ngoài đường'}`}
              size={16}
              color={colors.black}
              fontWeight="bold"
            />
          </RowComponent>
          <TextComponent
            text={`Sức chứa: ${capacity ? capacity : '100'} người`}
            size={15}
            color={'black'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  capacity: {
    fontSize: 15,
    color: '#666',
  },
  qrImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  ttban: {
    marginLeft: 5,
    paddingVertical: 5,
    marginBottom: 8,
  },
  imageNoQR: {
    width: 60,
    height: 60,
    borderColor: 'black',
    borderWidth: 0.5,
    marginRight: 10,
  },
  itemBan: {
    backgroundColor: '#F5F5F5',
    marginVertical: 3,
  },
});

export default ItemBan;
