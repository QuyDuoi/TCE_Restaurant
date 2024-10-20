import {View, Text} from 'react-native';
import React from 'react';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import SectionComponent from '../components/SectionComponent';
import {colors} from '../contants/hoaColors';
import {hoaStyles} from '../styles/hoaStyles';
import {HoaDonModel} from '../modelTests/modelTest';
import {formatTime} from '../utils/formatUtils';
import {HoaDon} from '../../../../store/HoaDonSlice';

interface Props {
  hoaDon: HoaDon;
  tenKhuVuc?: string;
  tenBan?: string;
  onPress?: () => void;
}

const ItemHoaDon = (props: Props) => {
  const {hoaDon, tenKhuVuc, tenBan, onPress} = props;

  return !hoaDon.id_ban ? (
    <View
      style={{
        marginHorizontal: 8,
        marginBottom: 10,
      }}>
      <TextComponent
        text={`Bán mang về (${
          hoaDon.hinhThucThanhToan ? 'Chuyển khoản' : 'Tiền mặt'
        })`}
        size={15}
        color={colors.black}
      />
      <TextComponent
        text={`Tổng tiền hóa đơn: ${hoaDon.tongGiaTri.toLocaleString()} VND`}
        size={15}
        color={colors.black}
      />
      <View style={{alignItems: 'flex-start', marginTop: 10}}>
        <ButtonComponent
          title="Xem chi tiết"
          onPress={onPress ?? (() => {})}
          titleSize={15}
          styles={{
            padding: 5,
          }}
          boderRadius={5}
          titleColor={colors.white}
          bgrColor={colors.orange}
        />
      </View>
      <View style={[hoaStyles.indicator2]} />
    </View>
  ) : (
    <View
      style={{
        marginHorizontal: 8,
        marginBottom: 10,
      }}>
      <TextComponent
        text={`Khu vực: ${tenKhuVuc} - ${
          tenBan?.length == 1 ? 'Bàn: ' + tenBan : tenBan
        } (${hoaDon.hinhThucThanhToan})`}
        size={15}
        color={colors.black}
      />
      <TextComponent
        text={`Thời gian vào: ${formatTime(
          hoaDon.thoiGianVaoBan ?? new Date(''),
        )}`}
        color={colors.desc}
      />
      <TextComponent
        text={`Thời gian ra: ${formatTime(
          hoaDon.thoiGianRaBan ?? new Date(''),
        )}`}
        color={colors.desc}
      />
      <TextComponent
        text={`Tổng tiền hóa đơn: ${hoaDon.tongGiaTri.toLocaleString()} VND`}
        size={15}
        color={colors.black}
      />
      <View style={{alignItems: 'flex-start', marginTop: 10}}>
        <ButtonComponent
          title="Xem chi tiết"
          onPress={onPress ?? (() => {})}
          titleSize={15}
          styles={{
            padding: 5,
          }}
          boderRadius={5}
          titleColor={colors.white}
          bgrColor={colors.orange}
        />
      </View>
      <View style={[hoaStyles.indicator2]} />
    </View>
  );
};

export default ItemHoaDon;
