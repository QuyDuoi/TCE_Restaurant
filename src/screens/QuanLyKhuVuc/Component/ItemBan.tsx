import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
  const { name, capacity, maQRCode, onPress } = props;
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    // Giả sử bạn đã gọi API và nhận được URL QR code từ backend
    if (maQRCode) {
      console.log("QR Code URL: ", qrCodeUrl);
      setQrCodeUrl(maQRCode); // Cập nhật URL QR code
    }
  }, [maQRCode]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.container}>
        <View style={styles.row}>
          {/* Hiển thị hình ảnh QR code */}
          {maQRCode ? (
            <Image source={{ uri: qrCodeUrl /*|| 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCy3VEI979ClRt_XDKG34bIT9WFMJWrbT9ew&s'*/ }} style={styles.qrImage} />
          ) : (
            <Text>Chưa có Qr</Text>
          )}

          {/* Thông tin bàn */}
          <View
        style={ styles.ttban}>
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
          color={colors.desc}
        />
      </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    paddingVertical: 5,
    marginBottom: 8,
  },
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
  ttban:{
      marginLeft: 5,
      paddingVertical: 5,
      marginBottom: 8,
  },
});

export default ItemBan;
