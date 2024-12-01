import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import ModalComponent from '../../QuanLyThucDon/Hoa/components/ModalComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {addNewHoaDon} from '../../../store/Slices/HoaDonSlice';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../store/store';
import {fetchCaLam} from '../../../store/Slices/CaLamSlice';
import {capNhatBanThunk} from '../../../store/Thunks/banThunks';
import {getListHoaDonTheoNhaHang} from '../../../services/api';

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedBan?: any;
  onCloseParent: () => void;
}

const ModalTaoHoaDon = (props: Props) => {
  const {visible, onClose, selectedBan, onCloseParent} = props;
  const idNhaHang = '66fab50fa28ec489c7137537';

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const caLams = useSelector((state: RootState) => state.calam.caLams);

  useEffect(() => {
    if (caLams.length === 0) {
      dispatch(fetchCaLam(idNhaHang) as any);
    }
  }, [caLams]);

  const caLamHienTai = caLams.find(
    calam => calam.ketThuc === null || calam.ketThuc === undefined,
  );
  //console.log(selectedBan);

  const handleTaoHoaDon = async () => {
    const data = {
      id_ban: selectedBan?._id,
      id_nhanVien: '671a4d2d9d3c2ab4130e3c6e',
      thoiGianVao: new Date(),
      id_nhaHang: '66fab50fa28ec489c7137537',
    };

    const result = await dispatch(addNewHoaDon(data as any) as any);
    //console.log(result.payload._id);

    if (result.type.endsWith('fulfilled')) {
      ToastAndroid.show('Tạo hóa đơn thành công', ToastAndroid.LONG);
      navigation.navigate('ChiTietHoaDonNVPV', {
        hoaDon: result.payload,
        tenKhuVuc: selectedBan?.kv?.tenKhuVuc,
        tenBan: selectedBan?.tenBan,
      });
      // const dataBan = {
      //   ...selectedBan,
      //   trangThai: 'Đang sử dụng',
      // };
      // dispatch(capNhatBanThunk({id: selectedBan?._id, ban: dataBan}) as any);
      // const resultHoaDon = await getListHoaDonTheoNhaHang(idNhaHang);
      // if (resultHoaDon) {
      onCloseParent();
      onClose();
      //}
    } else {
      ToastAndroid.show('Lỗi tạo hóa đơn', ToastAndroid.LONG);
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
      return `Ban: ${tenBan} | ${tenKhuVuc}`;
    } else {
      return `${tenBan} | ${tenKhuVuc}`;
    }
  };

  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      title="Tao Hoa Don"
      borderRadius={1}
      stylesContainer={{paddingHorizontal: 8}}>
      <SpaceComponent height={15} />
      <View style={[]}>
        <RowComponent styles={{marginHorizontal: 5}}>
          <TextComponent text="Thong tin ban: " styles={styles.text2} />
          <TextComponent
            text={
              khuVucBan(selectedBan?.kv?.tenKhuVuc, selectedBan?.tenBan) ?? null
            }
            styles={styles.text}
          />
        </RowComponent>
        <View style={styles.line} />
      </View>
      <SpaceComponent height={15} />
      <View style={[]}>
        <RowComponent styles={{marginHorizontal: 5}}>
          <TextComponent text="Thoi gian: " styles={styles.text2} />
          <TextComponent text={Moment()} styles={styles.text} />
        </RowComponent>
        <View style={styles.line} />
      </View>
      <SpaceComponent height={24} />
      <RowComponent justify="space-between">
        <ButtonComponent
          title="Huy"
          onPress={onClose}
          styles={styles.closeButton}
          titleColor={colors.black}
          titleSize={15}
        />
        <SpaceComponent width={10} />
        <ButtonComponent
          title="Xac nhan"
          onPress={handleTaoHoaDon}
          styles={styles.confirmButton}
          titleColor={colors.orange}
          titleSize={15}
        />
      </RowComponent>
    </ModalComponent>
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
