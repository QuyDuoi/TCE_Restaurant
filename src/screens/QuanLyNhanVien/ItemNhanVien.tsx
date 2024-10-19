import { View, Text, Image } from 'react-native';
import React from 'react';
import CardComponent from '../QuanLyThucDon/Hoa/components/CardComponent';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import { colors } from '../QuanLyThucDon/Hoa/contants/hoaColors';
import { IPV4 } from '../../services/api';
import NhanVienModel from '../../services/models/NhanVienModel';

interface Props {
  status?: boolean;
  colorStatus?: string;
  nameNhanVien: string;
  position: string;
  onPress?: () => void;
  avatar: string;
}

const ItemNhanVien = (props: Props) => {
  const { status, colorStatus, nameNhanVien, position, onPress, avatar } = props;

  // Handle avatar URL replacement if it's coming from localhost
  const employeeImage = avatar
    ? avatar.replace('localhost', IPV4)
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

  return (
    <CardComponent
      bgrColor={colorStatus ? colorStatus : '#C4E4FF'}
      styles={{
        marginVertical: 8,
      }}
      evlation={3}>
      <RowComponent
        onPress={onPress}
        justify="space-between"
        styles={{
          alignItems: 'center',
        }}>
        <RowComponent
          onPress={onPress}
          justify="flex-start"
          styles={{
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 16,
          }}>
          <Image
            source={{ uri: employeeImage }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
            }}
          />
          <View
            style={{
              marginLeft: 12,
              flex: 1,
            }}>
            <TextComponent
              text={nameNhanVien}
              fontWeight="bold"
              size={17}
              numberOfLines={1}
              color={colors.black}
            />
            <TextComponent text={position} color={colors.black} size={14} />
          </View>
        </RowComponent>
        <TextComponent
          text={status ? 'Đang hoạt động' : 'Ngưng làm việc'}
          fontWeight="bold"
          color={status ? colors.status : colors.status2}
          styles={{
            marginHorizontal: 8,
          }}
        />
      </RowComponent>
    </CardComponent>
  );
};

export default ItemNhanVien;
