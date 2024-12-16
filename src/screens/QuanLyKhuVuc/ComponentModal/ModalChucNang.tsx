import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import SectionComponent from '../../QuanLyThucDon/Hoa/components/SectionComponent';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import DatBanModal from './DatBanModal'; // Import modal đặt bàn
import ModalComponent from '../../QuanLyThucDon/Hoa/components/ModalComponent';
import {capNhatBanThunk} from '../../../store/Thunks/banThunks';
import TableBookingDetail from '../../../customcomponent/ItemChiTietDatBan';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import ModalTaoHoaDon from '../taoHoaDon/ModalTaoHoaDon';
import {useNavigation} from '@react-navigation/native';
import {HoaDon} from '../../../store/Slices/HoaDonSlice';
import {getListHoaDonTheoNhaHang} from '../../../services/api';
import UnsavedChangesModal from '../../../customcomponent/modalSave';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingModal from 'react-native-loading-modal';
import {useToast} from '../../../customcomponent/CustomToast';
import {io} from 'socket.io-client';
import {fetchKhuVucVaBan} from '../../../store/Thunks/khuVucThunks';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onCloseParent: () => void;
  selectedBan: any;
}

const ModalChucNang = (props: Props) => {
  const {isVisible, onClose, onCloseParent, selectedBan} = props;
  const [isVisibleDatBan, setIsVisibleDatBan] = useState(false);
  const [isVisibleChiTietBan, setIsVisibleChiTietBan] = useState(false);
  const [isVisibleModalTaoHoaDon, setIsVisibleModalTaoHoaDon] = useState(false);
  const [hoaDonsChuaThanhToan, setHoaDonsChuaThanhToan] = useState<
    HoaDon[] | null
  >([]);
  const [isVisibleModalHuyBan, setIsVisibleModalHuyBan] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [trangThaiCa, setTrangThaiCa] = useState(false);
  const caLams = useSelector((state: RootState) => state.calam.caLams);

  const navigation = useNavigation<any>();

  const bans = useSelector((state: RootState) => state.ban.bans);
  const user: any = useSelector((state: RootState) => state.user);
  const {showToast} = useToast();
  const id_nhaHang = user.id_nhaHang._id;

  const fetchHoaDon = async () => {
    try {
      const hoaDons = await getListHoaDonTheoNhaHang(user?.id_nhaHang._id);
      setHoaDonsChuaThanhToan(Array.isArray(hoaDons) ? hoaDons : []);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách hóa đơn:', error);
      setHoaDonsChuaThanhToan([]); // Đảm bảo state không bị thay đổi vô hạn
    }
  };

  useEffect(() => {
    fetchHoaDon();
  }, [bans]);

  useEffect(() => {
    // Kiểm tra lại các ca làm có trường ketThuc là null
    const checkCaLam = caLams.filter(caLam => caLam.ketThuc == null);

    if (checkCaLam.length > 0) {
      setTrangThaiCa(true); // Trạng thái chưa có ca mở
    } else {
      setTrangThaiCa(false); // Trạng thái đang có ca mở
    }
  }, []);

  useEffect(() => {
    const socket = io('https://tce-restaurant-api.onrender.com');

    socket.on('capNhatBan', () => {
      fetchHoaDon();
    });

    socket.on('huyDatMon', () => {
      dispatch(fetchKhuVucVaBan(id_nhaHang) as any);
    });

    // Cleanup khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const hoaDonSelected = Array.isArray(hoaDonsChuaThanhToan)
    ? hoaDonsChuaThanhToan.find(hoaDon => hoaDon.id_ban === selectedBan?._id)
    : undefined;

  const dispatch = useDispatch();

  const handleConfirmHuyBan = async () => {
    setIsLoadingModal(true);
    const data = {
      ...selectedBan,
      trangThai: 'Trống',
    };

    const result = await dispatch(
      capNhatBanThunk({id: selectedBan._id, ban: data}) as any,
    );

    if (result.type.endsWith('fulfilled')) {
      ToastAndroid.show('Hủy bàn thành công', ToastAndroid.LONG);
      setIsLoadingModal(false);
      setIsVisibleModalHuyBan(false);
      onCloseParent();
    } else {
      setTimeout(() => {
        setIsLoadingModal(false);
      }, 2000);
      ToastAndroid.show('Hủy bàn thất bại', ToastAndroid.LONG);
    }

    onClose();
  };

  return (
    <>
      <ModalComponent
        visible={isVisible}
        onClose={onClose}
        title="Lựa chọn chức năng">
        <View>
          <SectionComponent>
            <ButtonComponent
              title="Đặt bàn"
              onPress={() => {
                if (trangThaiCa) {
                  if (selectedBan && selectedBan.trangThai === 'Trống') {
                    setIsVisibleDatBan(true);
                  } else if (
                    selectedBan &&
                    selectedBan.trangThai === 'Đã đặt'
                  ) {
                    onClose();
                    showToast('remove', 'Bàn đã được đặt!', 'white', 2000);
                  } else if (
                    selectedBan &&
                    selectedBan.trangThai === 'Đang sử dụng'
                  ) {
                    onClose();
                    showToast(
                      'remove',
                      'Bàn đang được sử dụng!',
                      'white',
                      2000,
                    );
                  }
                } else {
                  onClose();
                  showToast(
                    'remove',
                    'Mở ca làm trước khi đặt bàn!',
                    'white',
                    2000,
                  );
                }
              }}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
              boderRadius={100}
            />
          </SectionComponent>
          <SectionComponent>
            <ButtonComponent
              title="Tạo hóa đơn"
              onPress={() => {
                if (selectedBan.trangThai === 'Đang sử dụng') {
                  onClose();
                  showToast('remove', 'Bàn đang được sử dụng!', 'white', 2000);
                } else {
                  setIsVisibleModalTaoHoaDon(true);
                }
              }}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
              boderRadius={100}
            />
          </SectionComponent>
          <SectionComponent>
            <ButtonComponent
              title="Xem thông tin hóa đơn"
              onPress={() => {
                if (
                  selectedBan.trangThai === 'Đang sử dụng' &&
                  hoaDonSelected?.trangThai === 'Chưa Thanh Toán'
                ) {
                  navigation.navigate('ChiTietHoaDonNVPV', {
                    hoaDon: hoaDonSelected,
                    tenKhuVuc: selectedBan?.kv?.tenKhuVuc,
                    tenBan: selectedBan?.tenBan,
                  });
                  onClose();
                } else {
                  onClose();
                  showToast('remove', 'Bàn chưa có hóa đơn!', 'white', 2000);
                }
              }}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
              boderRadius={100}
            />
          </SectionComponent>
          <SectionComponent>
            <ButtonComponent
              title="Xem thông tin bàn đặt"
              onPress={() => {
                setIsVisibleChiTietBan(true);
              }}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
              boderRadius={100}
            />
          </SectionComponent>
          <SectionComponent>
            <ButtonComponent
              title="Hủy bàn đặt"
              onPress={() => {
                if (selectedBan.trangThai === 'Đang sử dụng') {
                  onClose();
                  showToast('remove', 'Bàn đang được sử dụng!', 'white', 2000);
                } else if (selectedBan.trangThai === 'Trống') {
                  onClose();
                  showToast('remove', 'Bàn đang trống!', 'white', 2000);
                } else {
                  setIsVisibleModalHuyBan(true);
                }
              }}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
              boderRadius={100}
            />
          </SectionComponent>
          <SpaceComponent height={24} />
          <SectionComponent>
            <ButtonComponent
              title="Quay lại"
              onPress={onClose}
              bgrColor={colors.white}
              titleColor={colors.black}
              boederWidth={2}
              borderColor={colors.black}
              styles={styles.buttonClose}
              boderRadius={100}
            />
          </SectionComponent>
        </View>
      </ModalComponent>
      <DatBanModal
        isVisible={isVisibleDatBan}
        onClose={() => setIsVisibleDatBan(false)}
        selectedBan={selectedBan}
        onCloseParent={onCloseParent}
      />
      <TableBookingDetail
        slectedBan={selectedBan}
        visible={isVisibleChiTietBan}
        onClose={() => setIsVisibleChiTietBan(false)}
        //onEdit={() => setIsVisibleChiTietBan(false)}
      />
      <ModalTaoHoaDon
        visible={isVisibleModalTaoHoaDon}
        onClose={() => {
          setIsVisibleModalTaoHoaDon(false);
        }}
        selectedBan={selectedBan}
        onCloseParent={onCloseParent}
      />
      <UnsavedChangesModal
        visible={isVisibleModalHuyBan}
        title={'Thông báo'}
        content={'Bạn có chắc muốn hủy bàn đặt này không?'}
        onConfirm={handleConfirmHuyBan}
        onCancel={() => {
          setIsVisibleModalHuyBan(false);
        }}
        image={<Icon name="close" size={22} color="red" />}
      />
      <LoadingModal modalVisible={isLoadingModal} color={colors.orange} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
  },
  buttonClose: {
    height: 45,
    marginBottom: 3,
  },
});

export default ModalChucNang;
