import {View} from 'react-native';
import React from 'react';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import {formatTime} from '../QuanLyThucDon/Hoa/utils/formatUtils';
import {HoaDon} from '../../store/Slices/HoaDonSlice';

interface Props {
  hoaDon: HoaDon;
  tenKhuVuc?: string;
  tenBan?: string;
  onPress?: () => void;
  tongGiaTri?: number;
}

const ItemHoaDon = (props: Props) => {
  const {hoaDon, tenKhuVuc, tenBan, onPress, tongGiaTri} = props;

  console.log(typeof hoaDon.thoiGianVao);

  return !hoaDon.id_ban ? (
    <View
      style={{
        marginHorizontal: 8,
        marginBottom: 10,
      }}>
      <TextComponent
        text={`Bán mang về ${
          hoaDon.trangThai === 'Đã Thanh Toán'
            ? `(${hoaDon.hinhThucThanhToan ? `Chuyển khoản` : `Tiền mặt`})`
            : ''
        }`}
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
        } ${
          hoaDon.trangThai === 'Đã Thanh Toán'
            ? `(${hoaDon.hinhThucThanhToan ? `Chuyển khoản` : `Tiền mặt`})`
            : ''
        }`}
        size={15}
        color={colors.black}
      />
      <TextComponent
        text={`Thời gian vào: ${formatTime(
          new Date(hoaDon.thoiGianVao as any) ?? new Date(''),
        )}`}
        color={colors.desc}
      />
      <TextComponent
        text={`Thời gian ra: ${formatTime(
          new Date(hoaDon.thoiGianRa as any) ?? new Date(''),
        )}`}
        color={colors.desc}
      />
      <TextComponent
        text={`Tổng tiền hóa đơn: ${hoaDon.tongGiaTri?.toLocaleString()} VND`}
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
