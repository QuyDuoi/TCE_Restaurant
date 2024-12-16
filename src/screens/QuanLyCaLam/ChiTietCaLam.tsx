import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import CardComponent from '../QuanLyThucDon/Hoa/components/CardComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import ItemHoaDon from './ItemHoaDon';
import {
  formatDate,
  formatMoney,
  formatTime,
} from '../QuanLyThucDon/Hoa/utils/formatUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '../QuanLyThucDon/Hoa/components/ModalComponent';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {fetchHoaDonTheoCaLam, HoaDon} from '../../store/Slices/HoaDonSlice';
import {KhuVuc} from '../../store/Slices/KhuVucSlice';
import {Ban} from '../../store/Slices/BanSlice';
import {useNavigation} from '@react-navigation/native';
import {fetchKhuVucVaBan} from '../../store/Thunks/khuVucThunks';
import ModalTaoPhieuTC from './ModalTaoPhieuTC';
import ModalXacNhan from '../../customcomponent/ModalXacNhan';

import ModalDongCa from '../../customcomponent/ModalDongCa';
import {checkDongCaLam, dongCaLam} from './CallApiCaLam';
import {UserLogin} from '../../navigation/CustomDrawer';
import {useToast} from '../../customcomponent/CustomToast';
import {fetchCaLam} from '../../store/Slices/CaLamSlice';
import {getListNhanVien} from '../../services/api';
import {NhanVienSlice} from '../../store/Slices/NhanVienSlice';
import LoadingModal from 'react-native-loading-modal';

const ChiTietCaLam = ({route}: {route: any}) => {
  const {caLam} = route.params;
  const {showToast} = useToast();

  const [isVisibleDialog, setIsVisibleDialog] = useState(false);
  const [isVisibleCheckDongCa, setIsVisibleCheckDongCa] = useState(false);
  const [isVisibleDongCa, setIsVisibleDongCa] = useState(false);
  const [error, setError] = useState('');
  const [bansByKhuVuc, setBansByKhuVuc] = useState<(Ban & {kv: KhuVuc})[]>([]);
  const [visibleModalTaoPhieuTC, setVisibleModalTaoPhieuTC] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const navigation = useNavigation<any>();

  const batDau = caLam.batDau ? new Date(caLam.batDau) : new Date();
  const ketThuc = caLam.ketThuc ? new Date(caLam.ketThuc) : undefined;

  const dispatch = useDispatch();

  const user: UserLogin = useSelector((state: RootState) => state.user);
  const khuVucs = useSelector((state: RootState) => state.khuVuc.khuVucs);
  const bans = useSelector((state: RootState) => state.ban.bans);
  const hoaDons = useSelector((state: RootState) => state.hoaDons.hoaDons);
  const hoaDonStatus = useSelector((state: RootState) => state.hoaDons.status);
  const id_nhanVien = user._id;
  const id_nhaHang = user.id_nhaHang._id;

  //fetch hoa don va khu vuc tu api ve redux store
  useEffect(() => {
    dispatch(fetchHoaDonTheoCaLam(caLam._id as string) as any);

    if (bans.length === 0) {
      dispatch(fetchKhuVucVaBan(id_nhaHang) as any);
    }
  }, [caLam, dispatch]);

  useEffect(() => {
    if (bans.length > 0) {
      setBansByKhuVuc(bans as any);
    }
  }, [bans]);

  useEffect(() => {
    if (hoaDonStatus === 'loading') {
      setIsLoadingFetch(true);
    }
    if (hoaDonStatus === 'succeeded') {
      setIsLoadingFetch(false);
    }
  }, [hoaDonStatus]);

  console.log('render chi tiet ca lam');

  const getKhuVucBan = (idBan?: string) => {
    if (!idBan) return {tenKhuVuc: '', tenBan: ''};

    // Tìm bàn từ danh sách `bansByKhuVuc`
    const ban = bansByKhuVuc.find(item => item._id === idBan);
    if (!ban) return {tenKhuVuc: 'Không xác định', tenBan: 'Không xác định'};

    // Tìm khu vực từ thuộc tính `id_khuVuc` của bàn
    const khuVuc = khuVucs.find(kv => kv._id === ban.id_khuVuc);

    return {
      tenKhuVuc: khuVuc?.tenKhuVuc || 'Không xác định',
      tenBan: ban.tenBan || 'Không xác định',
    };
  };

  const dongCaLamCheck = async () => {
    try {
      setIsLoadingModal(true);
      // Gọi API đóng ca làm việc
      const response = await checkDongCaLam(caLam._id); // Gửi ID của ca làm việc qua API

      // Kiểm tra và xử lý phản hồi từ server
      if (response) {
        dispatch(fetchCaLam(id_nhaHang) as any);
        showToast('check', 'Đã đóng ca làm việc hiện tại', 'green', 1500);
        setIsVisibleCheckDongCa(false);
        setIsLoadingModal(false);
        // Cập nhật giao diện, ví dụ như cập nhật thời gian kết thúc của ca làm việc
        navigation.goBack(); // Quay lại trang trước sau khi đóng ca thành công
      }
    } catch (error: any) {
      setTimeout(() => {
        setIsLoadingModal(false);
      }, 2000);
      setIsVisibleCheckDongCa(false);
      setError(error.message);
      setIsVisibleDongCa(true);
    }
  };

  const dongCaLamBatChap = async () => {
    try {
      setIsLoadingModal(true);
      const response = await dongCaLam(caLam._id, id_nhanVien);
      if (response) {
        dispatch(fetchCaLam(id_nhaHang) as any);
        showToast('check', 'Đã đóng ca làm việc hiện tại', 'green', 1500);
        setIsVisibleCheckDongCa(false);
        setIsLoadingModal(false);
        navigation.goBack();
      }
    } catch (error: any) {
      setTimeout(() => {
        setIsLoadingModal(false);
      }, 2000);
      showToast('remove', error.message, 'red', 2000);
      setError(error.message);
    }
  };

  const renderItem = ({item}: {item: HoaDon}) => {
    const {tenKhuVuc, tenBan} = getKhuVucBan(item.id_ban);

    return (
      <ItemHoaDon
        key={item._id}
        hoaDon={item}
        tenKhuVuc={tenKhuVuc}
        tenBan={tenBan}
        onPress={() => {
          //console.log(item.id_nhanVien);

          navigation.navigate('ChiTietHoaDonScreen', {
            hoaDon: item,
            tenKhuVuc: tenKhuVuc,
            tenBan: tenBan,
            caLam: caLam,
            type: 'chiTietCaLam',
          });
        }}
      />
    );
  };

  return (
    <>
      <View
        style={[
          hoaStyles.containerTopping,
          {
            backgroundColor: colors.gray,
          },
        ]}>
        <SpaceComponent height={5} />
        <View style={[styles.container]}>
          <View>
            <CardComponent
              styles={{
                paddingHorizontal: 5,
              }}>
              <View
                style={{
                  marginVertical: 5,
                  marginHorizontal: 3,
                }}>
                <RowComponent justify="space-between">
                  <TitleComponent text="Chi tiết ca làm" size={19} />
                  <Icon
                    name="mail-reply"
                    size={22}
                    color={colors.black}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                </RowComponent>
                <TextComponent
                  text={`Nhân viên mở ca: ${caLam.id_nhanVien.hoTen}`}
                  color={colors.black}
                />
                <TextComponent
                  text={`Ngày mở: ${formatDate(batDau)}`}
                  color={colors.black}
                />
                <TextComponent
                  text={`Thời gian mở: ${formatTime(batDau)}`}
                  color={colors.black}
                />
                <TextComponent
                  text={`Thời gian đóng: ${
                    ketThuc ? formatTime(ketThuc) : 'Đang mở'
                  }`}
                  color={colors.black}
                />
                <RowComponent
                  justify="space-between"
                  styles={{
                    marginHorizontal: 12,
                    marginVertical: 10,
                  }}>
                  <ButtonComponent
                    disabled={caLam.ketThuc ? true : false}
                    title={caLam.ketThuc ? 'Đã đóng' : 'Đóng ca'}
                    onPress={() => setIsVisibleCheckDongCa(true)}
                    titleSize={15}
                    bgrColor={caLam.ketThuc ? colors.desc : colors.blue2}
                    titleColor={colors.white}
                    styles={{
                      height: 30,
                      paddingHorizontal: 10,
                    }}
                    boderRadius={5}
                  />
                  <ButtonComponent
                    title="Chi tiết doanh thu"
                    onPress={() => setIsVisibleDialog(true)}
                    titleSize={15}
                    bgrColor={colors.orange}
                    titleColor={colors.white}
                    styles={{
                      height: 30,
                      paddingHorizontal: 8,
                    }}
                    boderRadius={5}
                  />
                </RowComponent>
              </View>
            </CardComponent>
          </View>
          <SpaceComponent height={10} />
          <View style={[styles.bottomContainer]}>
            <View style={{flex: 1, margin: 10}}>
              <TitleComponent text="Danh sách hóa đơn" />
              <SpaceComponent height={10} />
              {isLoadingFetch ? (
                <ActivityIndicator
                  size="large"
                  color={colors.orange}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}
                />
              ) : hoaDons.length > 0 ? (
                <FlatList
                  data={hoaDons}
                  renderItem={renderItem}
                  keyExtractor={item => item._id as any}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TitleComponent text="Không có hóa đơn nào trong ca làm này" />
                </View>
              )}
              <SpaceComponent height={16} />
            </View>
          </View>
        </View>
      </View>

      <ModalXacNhan
        visible={isVisibleCheckDongCa}
        noiDung="Bạn muốn đóng ca làm hiện tại?"
        onCancel={() => setIsVisibleCheckDongCa(false)}
        onConfirm={dongCaLamCheck}
      />

      <ModalDongCa
        visible={isVisibleDongCa}
        noiDung={error}
        onCancel={() => setIsVisibleDongCa(false)}
        onThanhToan={() => {
          setIsVisibleDongCa(false);
          navigation.navigate('HoaDon');
        }}
        onDongCa={dongCaLamBatChap}
      />

      <ModalXacNhan
        visible={isVisibleCheckDongCa}
        noiDung="Bạn muốn đóng ca làm hiện tại?"
        onCancel={() => setIsVisibleCheckDongCa(false)}
        onConfirm={dongCaLamCheck}
      />

      <ModalDongCa
        visible={isVisibleDongCa}
        noiDung={error}
        onCancel={() => setIsVisibleDongCa(false)}
        onThanhToan={() => {
          setIsVisibleDongCa(false);
          navigation.navigate('HoaDon');
        }}
        onDongCa={dongCaLamBatChap}
      />

      {/*MODAL CHI TIET DOANH THU */}
      <ModalComponent
        visible={isVisibleDialog}
        title="Chi tiết doanh thu"
        isClose
        onClose={() => setIsVisibleDialog(false)}>
        <TextComponent
          text={`Số dư ban đầu: ${formatMoney(caLam.soDuBanDau)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Số dư hiện tại: ${formatMoney(caLam.soDuHienTai)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Tổng tiền mặt: ${formatMoney(caLam.tongTienMat)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Tổng chuyển khoản: ${formatMoney(caLam.tongChuyenKhoan)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Tổng doanh thu: ${formatMoney(caLam.tongDoanhThu)}`}
          styles={styles.textStyle}
        />
        <RowComponent justify="flex-start">
          <TextComponent text="Phiếu thu, chi:" styles={styles.textStyle} />
          <ButtonComponent
            title="Chi tiết"
            onPress={() => {
              setIsVisibleDialog(false);
              navigation.navigate('ThuChiScreen', {caLam: caLam});
            }}
            bgrColor={colors.blue2}
            titleColor={colors.white}
            titleSize={12}
            styles={{
              paddingHorizontal: 10,
              marginLeft: 10,
              height: 20,
            }}
            boderRadius={5}
          />
          <SpaceComponent width={6} />
          <ButtonComponent
            title="Tạo phiếu"
            onPress={() => {
              setVisibleModalTaoPhieuTC(true);
            }}
            bgrColor={colors.blue2}
            titleColor={colors.white}
            titleSize={12}
            styles={{
              paddingHorizontal: 10,
              marginLeft: 10,
              height: 20,
            }}
            boderRadius={5}
          />
        </RowComponent>
        <TextComponent
          text={`Tổng thu: ${formatMoney(caLam.tongThu)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Tổng chi: ${formatMoney(caLam.tongChi)}`}
          styles={styles.textStyle}
        />
      </ModalComponent>

      {/*MODAL TAO PHIEU THU, CHI */}
      <ModalTaoPhieuTC
        visible={visibleModalTaoPhieuTC}
        onClose={() => setVisibleModalTaoPhieuTC(false)}
        caLam={caLam}
      />
      <LoadingModal modalVisible={isLoadingModal} color={colors.orange} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    width: '95%',
    height: '98%',
    alignSelf: 'center',
    marginTop: 5,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  textStyle: {
    color: colors.black,
    fontSize: 15,
    marginBottom: 8,
  },
});

export default ChiTietCaLam;
