import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import ModalComponent from '../components/ModalComponent';
import SpaceComponent from '../components/SpaceComponent';
import RowComponent from '../components/RowComponent';
import TitleComponent from '../components/TitleComponent';
import {formatMoney} from '../utils/formatUtils';
import {colors} from '../contants/hoaColors';
import ButtonComponent from '../components/ButtonComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SectionComponent from '../components/SectionComponent';
import TextComponent from '../components/TextComponent';
import {thanhToanBanHang} from '../../../../services/api';
import LoadingModal from 'react-native-loading-modal';
interface Props {
  visible: boolean;
  onClose: () => void;
  totalFinalBill: number;
  discount?: number;
  chiTiets?: any[];
  onPaid?: (value: boolean) => void;
}

const ModalPTTTBMD = (props: Props) => {
  const {visible, onClose, totalFinalBill, discount, chiTiets, onPaid} = props;
  const [isLoading, setIsLoading] = useState(false);
  const id_nhanVien = '67060f3497bc70ba1d9222ac';
  const idNhaHang = '66fab50fa28ec489c7137537';

  //console.log(discount);

  const [chuyenKhoan, setChuyenKhoan] = useState(true);
  const [isPercent, setIsPercent] = useState(true);
  const [apiQr, setApiQr] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500',
  );
  const [isLoadingQr, setIsLoadingQr] = useState(false);

  const dispatch = useDispatch();

  const idBank = '970422';
  const stk = '0393911183';
  const templateQR = '1Lh5PBl';

  useEffect(() => {
    //LOAD QR

    const getQrCode = async () => {
      try {
        setIsLoadingQr(true);
        const result = await fetch(
          `https://api.vietqr.io/image/${idBank}-${stk}-${templateQR}.jpg?amount=${totalFinalBill}`,
        );
        setApiQr(result.url);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingQr(false);
      }
    };
    getQrCode();
  }, [totalFinalBill]);

  const handleChangeChuyenKhoan = useCallback((value: boolean) => {
    setChuyenKhoan(value);
  }, []);

  //xu ly thanh toan
  const handleThanhToan = async () => {
    setIsLoading(true);
    const data = {
      chiTietHoaDons: chiTiets,
      hoaDon: {
        tongGiaTri: totalFinalBill,
        tienGiamGia: discount,
        hinhThucThanhToan: chuyenKhoan ? true : false,
        trangThai: 'Đã Thanh Toán',
        thoiGianRa: new Date().toISOString(),
      },
      id_nhaHang: idNhaHang,
      //_id la id cua nhan vien
      _id: id_nhanVien,
    };

    const result = await thanhToanBanHang(dispatch, data as any);
    if (result) {
      ToastAndroid.show('Thanh toán thành công', ToastAndroid.SHORT);
      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    onPaid?.(true);
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
        </RowComponent>
        {chuyenKhoan && (
          <SectionComponent styles={[styles.contaierImage]}>
            {isLoadingQr ? (
              <ActivityIndicator
                size="large"
                color={colors.orange}
                style={styles.image}
              />
            ) : (
              <Image
                source={{
                  uri: apiQr,
                }}
                style={[styles.image]}
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
      <LoadingModal
        modalVisible={isLoading}
        darkMode={false}
        color={colors.orange}
      />
    </>
  );
};

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
    width: 200,
    height: 195,
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

export default ModalPTTTBMD;
