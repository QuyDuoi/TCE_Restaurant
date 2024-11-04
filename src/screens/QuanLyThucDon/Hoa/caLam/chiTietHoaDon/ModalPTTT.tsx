import {View, Text, StyleSheet} from 'react-native';
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
import {HoaDon, updateHoaDonThunk} from '../../../../../store/HoaDonSlice';
import {useDispatch} from 'react-redux';

interface Props {
  visible: boolean;
  onClose: () => void;
  totalFinalBill?: number;
  hoaDon: HoaDon;
  discount: number;
}

const ModalPTTT = React.memo((props: Props) => {
  const {visible, onClose, totalFinalBill, hoaDon, discount} = props;

  const [chuyenKhoan, setChuyenKhoan] = useState(true);
  const dispatch = useDispatch();

  //console.log(hoaDon, discount);

  const handleChangeChuyenKhoan = useCallback((value: boolean) => {
    setChuyenKhoan(value);
  }, []);

  const handleThanhToan = async () => {
    const formData = {
      trangThai: 'Đã Thanh Toán',
      hinhThucThanhToan: chuyenKhoan ? true : false,
      tongGiaTri: totalFinalBill as number,
      tienGiamGia: discount,
    };
    const result = await dispatch(
      updateHoaDonThunk({
        id: hoaDon._id as string,
        formData: formData as any,
      }) as any,
    );
    if (result.type.endsWith('fulfilled')) {
      onClose();
    }
  };
  return (
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
        style={{height: 1 * 1.5, backgroundColor: colors.desc2, width: '100%'}}
      />

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
          onPress={onClose}
          titleFontWeight="500"
          titleSize={14}
          styles={[styles.button]}
          boderRadius={2}
          titleColor={colors.desc}
          bgrColor={colors.desc2}
        />
      </RowComponent>
    </ModalComponent>
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
});

export default React.memo(ModalPTTT);
