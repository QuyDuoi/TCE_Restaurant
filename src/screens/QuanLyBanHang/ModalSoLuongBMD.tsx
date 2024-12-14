import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ModalComponent from '../QuanLyThucDon/Hoa/components/ModalComponent';
import CardComponent from '../QuanLyThucDon/Hoa/components/CardComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import {formatMoney} from '../QuanLyThucDon/Hoa/utils/formatUtils';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import {ipAddress, IPV4} from '../../services/api';
import {addOrUpdate} from '../../store/Slices/ChiTietMonSlice';
import {RootState} from '../../store/store';
import {MonAn} from '../../store/Slices/MonAnSlice';
import InputComponent from '../QuanLyThucDon/Hoa/components/InputComponent';

interface Props {
  visible: boolean;
  onClose: () => void;
  item: any;
  updateItem?: (value: any) => void;
  onUpdateMonAnTuChon?: (value: any) => void;
  giaMon?: number;
  type?: any;
}

const ModalSoLuongBMD = (props: Props) => {
  const {visible, onClose, item, updateItem, onUpdateMonAnTuChon, type} = props;
  const [soLuong, setSoLuong] = useState(0);
  const [giaTien, setGiaTien] = useState(0);
  const [itemSelected, setItemSelected] = useState<any>(null);

  //VUA UPDATE
  const [ghiChuUpdate, setGhiChuUpdate] = useState('');

  const giaMotMon = item ? item.giaTien / item.soLuongMon : 0;

  const monAns = useSelector((state: RootState) => state.monAn.monAns);

  useEffect(() => {
    setSoLuong(item?.soLuongMon ?? 0);
    setGiaTien(item?.giaTien ?? 0);
    setGhiChuUpdate(item?.ghiChu ?? '');
    setItemSelected(item);
  }, [item]);

  const handleChangeSoLuong = useCallback((value: number) => {
    setSoLuong(Math.max(0, value));
  }, []);

  useEffect(() => {
    setGiaTien(parseInt((giaMotMon * soLuong).toString()));
  }, [soLuong]);

  const handleConfirm = useCallback(() => {
    const updatedItem = {
      ...itemSelected,
      soLuongMon: soLuong,
      giaTien: giaTien,
      ghiChu: ghiChuUpdate,
    };
    //DE ID_MONAN HOAC TEN MON
    item?.id_monAn
      ? updateItem?.(updatedItem)
      : onUpdateMonAnTuChon?.(updatedItem);
    onClose();
  }, [soLuong, giaTien, ghiChuUpdate]);

  const monAnSelected = monAns.find(
    (monAn: MonAn) => monAn._id === item?.id_monAn,
  );

  const anhMonAn = monAnSelected
    ? monAnSelected.anhMonAn.replace('localhost', `${ipAddress}`)
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      borderRadius={1}
      title={type === 'edit' ? 'Cập nhật' : 'Cập nhật số lượng'}>
      <CardComponent
        styles={{
          marginVertical: 16,
          marginHorizontal: 2,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderColor: colors.desc2,
        }}
        evlation={20}
        bgrColor={colors.white}
        borderWidth={1}>
        <RowComponent justify="space-between" styles={[{}]}>
          {item?.id_monAn ? (
            <Image
              source={{
                uri: anhMonAn,
              }}
              style={[hoaStyles.image]}
            />
          ) : (
            <View
              style={[
                hoaStyles.image,
                {alignItems: 'center', justifyContent: 'center'},
              ]}>
              <TextComponent text="Tùy chọn" color={colors.text2} />
            </View>
          )}

          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
            }}>
            <View style={{alignItems: 'flex-start'}}>
              <RowComponent onPress={() => {}}>
                <TextComponent
                  text={item?.tenMon ?? ''}
                  fontWeight="bold"
                  color={colors.text2}
                  size={14}
                  minHeight={28}
                  numberOfLines={1}
                />
                <SpaceComponent width={10} />
              </RowComponent>

              <TextComponent text={`${formatMoney(giaTien)}`} minHeight={28} />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginRight: 8,
            }}>
            <RowComponent styles={{alignItems: 'center'}}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  handleChangeSoLuong(soLuong - 1);
                }}>
                <Icon name="minus" size={14} color={colors.text2} />
              </TouchableOpacity>
              <SpaceComponent width={10} />
              <View
                style={{
                  width: 26,
                  alignItems: 'center',
                }}>
                <TextComponent
                  text={`${soLuong}`}
                  color={colors.text2}
                  size={16}
                />
              </View>
              <SpaceComponent width={10} />
              <TouchableOpacity
                style={{}}
                onPress={() => handleChangeSoLuong(soLuong + 1)}>
                <Icon name="plus" size={14} color={colors.text2} />
              </TouchableOpacity>
            </RowComponent>
          </View>
        </RowComponent>
      </CardComponent>
      {type === 'edit' && (
        <InputComponent
          value={ghiChuUpdate}
          onChangeText={text => setGhiChuUpdate(text)}
          placeholder="Ghi chú"
          styles={[styles.input2]}
          numberOfLines={5}
          type="normal"
          multiline={true}
        />
      )}
      <RowComponent justify="space-between" styles={{paddingHorizontal: 5}}>
        <ButtonComponent
          title="Đóng"
          onPress={() => {
            setSoLuong(item?.soLuongMon ?? 0);
            setGiaTien(item?.giaTien ?? 0);
            onClose();
          }}
          styles={styles.button}
          titleSize={15}
          bgrColor={colors.desc2}
          titleFontWeight="600"
        />
        <ButtonComponent
          title="Lưu thay đổi"
          onPress={handleConfirm}
          styles={styles.button}
          titleSize={15}
          bgrColor={'#FEF3EF'}
          titleColor={colors.orange}
          titleFontWeight="600"
        />
      </RowComponent>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '40%',
    height: 35,
  },
  input2: {
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.desc2,
    textAlignVertical: 'top',
    marginTop: 5,
    marginBottom: 10,
    height: undefined,
    minHeight: 100,
    //width: '90%',
  },
});

export default ModalSoLuongBMD;
