import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ActivityIndicator,
} from 'react-native';

import React, {useEffect, useState, useCallback} from 'react';
import ModalComponent from '../../QuanLyThucDon/Hoa/components/ModalComponent';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import SectionComponent from '../../QuanLyThucDon/Hoa/components/SectionComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import {formatMoney} from '../../QuanLyThucDon/Hoa/utils/formatUtils';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  HoaDon,
  thanhToanHoaDonThunk,
  updateHoaDonThunk,
} from '../../../store/Slices/HoaDonSlice';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import ModalGiamGia from './ModalGiamGia';
import {getListHoaDonTheoNhaHang, thanhToanHoaDon} from '../../../services/api';
import {RootState} from '../../../store/store';
import {capNhatBanThunk} from '../../../store/Thunks/banThunks';
import LoadingModal from 'react-native-loading-modal';
import {UserLogin} from '../../../navigation/CustomDrawer';
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
  const [apiQR, setApiQR] = useState('');
  const [isLoadingQR, setIsLoadingQR] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const dispatch = useDispatch();

  const bans = useSelector((state: RootState) => state.ban.bans);
  const user: UserLogin = useSelector((state: RootState) => state.user);

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

  useEffect(() => {
    if (isLoadingModal) {
      setTimeout(() => {
        setIsLoadingModal(false);
      }, 5000);
    }
  }, [isLoadingModal]);

  //IMAGE QR
  const id_nhanVien = user._id;
  const id_nhaHang = user.id_nhaHang._id;
  const nganHang = user.id_nhaHang.nganHang;
  const soTaiKhoan = user.id_nhaHang.soTaiKhoan;
  const chuTaiKhoan = user.id_nhaHang.chuTaiKhoan;
  const messageQr = 'manghettienday';

  useEffect(() => {
    const getQR = async () => {
      try {
        setIsLoadingQR(true);
        const response = await fetch(
          `https://img.vietqr.io/image/${nganHang}-${soTaiKhoan}-1Lh5PBl.png?amount=${totalFinalBill}&addInfo=${messageQr}&accountName=${chuTaiKhoan}`,
        );
        setApiQR(response.url);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingQR(false);
      }
    };
    //console.log(apiQR);

    getQR();
  }, [totalFinalBill]);

  //xu ly thanh toan
  const handleThanhToan = async () => {
    setIsLoadingModal(true);
    const formData = {
      id_nhanVien: user._id,
      hinhThucThanhToan: chuyenKhoan ? true : false,
      tienGiamGia: discount ? discount : hoaDon.tienGiamGia,
      thoiGianRa: new Date().toISOString(),
    };
    const result = await thanhToanHoaDon(
      hoaDon._id as string,
      formData.tienGiamGia as number,
      formData.hinhThucThanhToan,
      new Date(formData.thoiGianRa),
      formData.id_nhanVien,
    );
    if (result.ok) {
      setIsLoadingModal(false);
      ToastAndroid.show('Thanh toán thành công', ToastAndroid.SHORT);
      onChange && onChange(true);
      //xu ly trang thai ban
      if (banSelected) {
        setIsLoadingModal(true);
        const updateBan = await dispatch(
          capNhatBanThunk({
            id: banSelected._id as string,
            ban: {
              ...banSelected,
              trangThai: 'Trống',
              ghiChu: '',
            },
          }) as any,
        );
        if (updateBan.type.endsWith('fulfilled')) {
          setIsLoadingModal(false);
        }
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
            {isLoadingQR ? (
              <ActivityIndicator
                size="large"
                color={colors.orange}
                style={styles.image}
              />
            ) : (
              <Image
                source={{uri: apiQR}}
                style={styles.image}
                resizeMode="contain"
              />
            )}
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
      <LoadingModal modalVisible={isLoadingModal} color={colors.orange} />
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
    width: 180,
    height: 185,
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
