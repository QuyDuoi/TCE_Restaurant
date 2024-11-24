import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ModalComponent from '../components/ModalComponent';
import CardComponent from '../components/CardComponent';
import {colors} from '../contants/hoaColors';
import RowComponent from '../components/RowComponent';
import {hoaStyles} from '../styles/hoaStyles';
import TextComponent from '../components/TextComponent';
import SpaceComponent from '../components/SpaceComponent';
import {formatMoney} from '../utils/formatUtils';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonComponent from '../components/ButtonComponent';
import {ipAddress} from '../../../../services/api';

interface Props {
  visible: boolean;
  onClose: () => void;
  item: any;
  giaMon?: number;

  updateItem?: (value: any) => void;
}

const ModalSoLuongBMD = (props: Props) => {
  const {visible, onClose, item, updateItem, giaMon} = props;
  const [soLuong, setSoLuong] = useState(0);
  const [giaTien, setGiaTien] = useState(0);
  const [itemSelected, setItemSelected] = useState<any>(null);

  //console.log('item', item);

  //const giaMotMon = giaMon ? giaMon / item.soLuongMon : 0;
  const giaMotMon = item ? item.giaTien / item.soLuongMon : 0;
  //console.log('gia mot mon', giaMotMon);

  useEffect(() => {
    setSoLuong(item?.soLuongMon ?? 0);
    setGiaTien(item?.giaTien ?? 0);
    setItemSelected(item);
  }, [item]);

  const handleChangeSoLuong = useCallback((value: number) => {
    setSoLuong(Math.max(0, value));
  }, []);

  useEffect(() => {
    setGiaTien(parseInt((giaMotMon * soLuong).toString()));
  }, [soLuong]);

  const dispatch = useDispatch();

  const handleConfirm = useCallback(() => {
    const updatedItem = {
      ...itemSelected,
      soLuongMon: soLuong,
      giaTien: giaTien,
    };
    updateItem?.(updatedItem);

    //console.log('updatedItem', updatedItem);

    onClose();
  }, [soLuong, giaTien]);

  const anhMonAn = item?.id_monAn?.anhMonAn
    ? item.id_monAn.anhMonAn.replace('localhost', `${ipAddress}`)
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      borderRadius={1}
      title="Cap nhat so luong">
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
          <Image
            source={{
              uri: anhMonAn,
            }}
            style={[hoaStyles.image]}
          />

          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
            }}>
            <View style={{alignItems: 'flex-start'}}>
              <RowComponent onPress={() => {}}>
                <TextComponent
                  text={item?.id_monAn?.tenMon ?? ''}
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
      <RowComponent justify="space-between" styles={{paddingHorizontal: 5}}>
        <ButtonComponent
          title="Dong"
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
          title="Luu thay doi"
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
});

export default ModalSoLuongBMD;
