import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import React, {useEffect, useState, useCallback} from 'react';
import ModalComponent from '../../components/ModalComponent';
import RowComponent from '../../components/RowComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../contants/hoaColors';
import SpaceComponent from '../../components/SpaceComponent';
import ButtonComponent from '../../components/ButtonComponent';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import {formatMoney} from '../../utils/formatUtils';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  HoaDon,
  thanhToanHoaDonThunk,
  updateHoaDonThunk,
} from '../../../../../store/Slices/HoaDonSlice';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import ModalGiamGia from './ModalGiamGia';
import {
  getListHoaDonTheoNhaHang,
  thanhToanHoaDon,
} from '../../../../../services/api';
import {RootState} from '../../../../../store/store';
import {updateBanThunk} from '../../../../../store/Slices/BanSlice';

interface Props {
  visible: boolean;
  onClose: () => void;
  totalFinalBill?: number;
  hoaDon: HoaDon;
  discount?: number;
  onChange?: (value: boolean) => void;
  type?: string;
  chiTietHoaDons?: any[];
}

const ModalPTTT = React.memo((props: Props) => {
  const navigation = useNavigation<any>(); // Khởi tạo navigation
  const {visible, onClose, totalFinalBill, hoaDon, discount, onChange, type} =
    props;

  const [chuyenKhoan, setChuyenKhoan] = useState(true);
  const [isPercent, setIsPercent] = useState(true);

  const dispatch = useDispatch();

  const bans = useSelector((state: RootState) => state.ban.bans);
  const banSelected = hoaDon?.id_ban
    ? bans.find(item => item._id === hoaDon?.id_ban)
    : undefined;

  const handleChangeChuyenKhoan = useCallback((value: boolean) => {
    setChuyenKhoan(value);
  }, []);

  const handlePrintInvoice = () => {
    navigation.navigate('InHoaDon', {
      hoaDon, // Gửi thông tin hóa đơn
      chiTietHoaDons: props.chiTietHoaDons, // Gửi danh sách chi tiết hóa đơn
      totalFinalBill, // Gửi tổng tiền sau giảm giá
    });
    onClose(); // Đóng modal sau khi điều hướng
  };

  //xu ly thanh toan
  const handleThanhToan = async () => {
    const formData = {
      hinhThucThanhToan: chuyenKhoan ? true : false,
      tienGiamGia: discount ? discount : hoaDon.tienGiamGia,
      thoiGianRa: new Date().toISOString(),
    };
    const result = await thanhToanHoaDon(
      hoaDon._id as string,
      formData.tienGiamGia as number,
      formData.hinhThucThanhToan,
      new Date(formData.thoiGianRa),
    );
    if (result) {
      ToastAndroid.show('Thanh toán thành công', ToastAndroid.SHORT);
      onChange && onChange(true);
      //xu ly trang thai ban
      if (banSelected) {
        dispatch(
          updateBanThunk({
            id: banSelected._id as string,
            formData: {
              ...banSelected,
              trangThai: 'Trống',
              ghiChu: '',
            },
          }) as any,
        );
      }
      onClose();
    } else {
      ToastAndroid.show('Thanh toán thất bại', ToastAndroid.SHORT);
    }
  };
  return (
    <>
      <ModalComponent
        visible={visible}
        onClose={onClose}
        title="Chọn hình thức thanh toán"
        stylesTitle={{
          color: colors.red,
        }}>
        <SpaceComponent height={10} />
        <RowComponent justify="space-between" styles={{marginHorizontal: 12}}>
          <TitleComponent text="Tổng tiền" />
          <TitleComponent
            text={`${formatMoney(totalFinalBill as number)}`}
            color={colors.desc}
          />
        </RowComponent>
        <SpaceComponent height={10} />
        <View
          style={{
            height: 1 * 1.5,
            backgroundColor: colors.desc2,
            width: '100%',
          }}
        />
        <SpaceComponent height={10} />

        <RowComponent
          styles={{
            marginVertical: 16,
          }}>
          <ButtonComponent
            title="Chuyển khoản"
            onPress={() => handleChangeChuyenKhoan(true)}
            titleFontWeight="500"
            titleSize={14}
            boederWidth={1 * 1.5}
            borderColor={chuyenKhoan ? 'rgba(153, 158, 237, 1)' : colors.desc}
            boderRadius={5}
            titleColor={chuyenKhoan ? 'rgba(153, 158, 237, 1)' : colors.desc}
            styles={{
              padding: 6,
            }}
          />
          <ButtonComponent
            title="Tiền mặt"
            onPress={() => handleChangeChuyenKhoan(false)}
            titleFontWeight="500"
            titleSize={14}
            styles={{marginLeft: 16, padding: 6}}
            boederWidth={1 * 1.5}
            borderColor={chuyenKhoan ? colors.desc : 'rgba(153, 158, 237, 1)'}
            boderRadius={5}
            titleColor={chuyenKhoan ? colors.desc : 'rgba(153, 158, 237, 1)'}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handlePrintInvoice}
            activeOpacity={0.8}>
            <View style={styles.content}>
              <FontAwesome name="print" size={18} color="black" />
              <Text style={styles.text}>In Hóa Đơn</Text>
            </View>
          </TouchableOpacity>
        </RowComponent>
        {chuyenKhoan && (
          <SectionComponent styles={[styles.contaierImage]}>
            <TextComponent
              text="Ảnh QR"
              styles={[
                styles.image,
                {
                  backgroundColor: 'green',
                },
              ]}
            />
          </SectionComponent>
        )}
        <RowComponent styles={{marginVertical: 8}} justify="space-between">
          <ButtonComponent
            title="Thanh toán"
            onPress={handleThanhToan}
            titleFontWeight="500"
            titleSize={14}
            boderRadius={2}
            titleColor={'rgba(60, 138, 86, 1)'}
            styles={[styles.button]}
            bgrColor="rgba(222, 247, 232, 1)"
          />
          <ButtonComponent
            title="Quay lại"
            onPress={() => {
              setIsPercent(true);
              onClose();
            }}
            titleFontWeight="500"
            titleSize={14}
            styles={[styles.button]}
            boderRadius={2}
            titleColor={colors.desc}
            bgrColor={colors.desc2}
          />
        </RowComponent>
      </ModalComponent>
    </>
  );
});

const styles = StyleSheet.create({
  button: {
    width: '45%',
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  contaierImage: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: colors.black,
    left: 0,
  },
});

export default React.memo(ModalPTTT);
