import {View, StyleSheet, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import ModalComponent from '../../QuanLyThucDon/Hoa/components/ModalComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {addNewHoaDon} from '../../../store/Slices/HoaDonSlice';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../store/store';
import {fetchCaLam} from '../../../store/Slices/CaLamSlice';
import LoadingModal from 'react-native-loading-modal';
import {UserLogin} from '../../../navigation/CustomDrawer';
import {useToast} from '../../../customcomponent/CustomToast';

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedBan?: any;
  onCloseParent: () => void;
}

const ModalTaoHoaDon = (props: Props) => {
  const {visible, onClose, selectedBan, onCloseParent} = props;

  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const {showToast} = useToast();

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const caLams = useSelector((state: RootState) => state.calam.caLams);
  const user: UserLogin = useSelector((state: RootState) => state.user);
  const idNhaHang = user?.id_nhaHang?._id;

  useEffect(() => {
    if (caLams.length === 0) {
      dispatch(fetchCaLam(idNhaHang) as any);
    }
  }, [caLams]);

  const handleTaoHoaDon = async () => {
    setIsLoadingModal(true);
    const data = {
      id_ban: selectedBan?._id,
      id_nhanVien: user._id,
      thoiGianVao: new Date(),
      id_nhaHang: idNhaHang,
    };

    try {
      const result = await dispatch(addNewHoaDon(data as any) as any).unwrap();
      // Nếu unwrap thành công
      setIsLoadingModal(false);
      ToastAndroid.show('Tạo hóa đơn thành công', ToastAndroid.LONG);
      navigation.navigate('ChiTietHoaDonNVPV', {
        hoaDon: result, // unwrap trả về payload trực tiếp
        tenKhuVuc: selectedBan?.kv?.tenKhuVuc,
        tenBan: selectedBan?.tenBan,
      });

      onCloseParent();
      onClose();
    } catch (error) {
      setIsLoadingModal(false);
      onCloseParent();
      onClose();
      showToast('remove', error, 'white', 2000);
    }
  };

  const Moment = () => {
    return (
      new Date().toLocaleString('vi-VN').slice(0, 5) +
      ' - ' +
      new Date().toLocaleString('vi-VN').slice(10)
    );
  };

  const khuVucBan = (tenKhuVuc?: string, tenBan?: string) => {
    if (tenBan?.length === 1) {
      return `Bàn: ${tenBan} | ${tenKhuVuc}`;
    } else {
      return `${tenBan} | ${tenKhuVuc}`;
    }
  };

  return (
    <>
      <ModalComponent
        visible={visible}
        onClose={onClose}
        title="Tạo Hóa Đơn"
        borderRadius={1}
        stylesContainer={{paddingHorizontal: 8}}>
        <SpaceComponent height={15} />
        <View style={[]}>
          <RowComponent styles={{marginHorizontal: 5}}>
            <TextComponent text="Thông tin bàn: " styles={styles.text2} />
            <TextComponent
              text={
                khuVucBan(selectedBan?.kv?.tenKhuVuc, selectedBan?.tenBan) ??
                null
              }
              styles={styles.text}
            />
          </RowComponent>
          <View style={styles.line} />
        </View>
        <SpaceComponent height={15} />
        <View style={[]}>
          <RowComponent styles={{marginHorizontal: 5}}>
            <TextComponent text="Thời gian: " styles={styles.text2} />
            <TextComponent text={Moment()} styles={styles.text} />
          </RowComponent>
          <View style={styles.line} />
        </View>
        <SpaceComponent height={24} />
        <RowComponent justify="space-between">
          <ButtonComponent
            title="Hủy"
            onPress={onClose}
            styles={styles.closeButton}
            titleColor={colors.black}
            titleSize={15}
          />
          <SpaceComponent width={10} />
          <ButtonComponent
            title="Xác nhận"
            onPress={handleTaoHoaDon}
            styles={styles.confirmButton}
            titleColor={colors.orange}
            titleSize={15}
          />
        </RowComponent>
      </ModalComponent>
      <LoadingModal modalVisible={isLoadingModal} color={colors.orange} />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: colors.black,
  },
  text2: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.black,
  },
  line: {
    backgroundColor: colors.desc2,
    width: '99%',
    height: 1 * 1.5,
    marginTop: 12,
  },
  closeButton: {
    flex: 1,
    height: 45,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  confirmButton: {
    flex: 1,
    height: 45,
    padding: 10,
    backgroundColor: '#ffede7',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#5c5c5c',
    fontWeight: '500',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#ff6b35',
    fontWeight: '500',
  },
});

export default ModalTaoHoaDon;
