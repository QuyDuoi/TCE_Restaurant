import {View, Text, Switch, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {MonAn} from '../../store/Slices/MonAnSlice';
import {IPV4} from '../../services/api';
import CardComponent from '../QuanLyThucDon/Hoa/components/CardComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import {formatMoney} from '../QuanLyThucDon/Hoa/utils/formatUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

interface Props {
  monAn: MonAn;
  intialSoLuong: number;
  onQuantityChange: (
    idMonAn: string,
    newQuantity: number,
    tenMon: string,
    giaTien: number,
  ) => void;
  onChangeChiTiets: boolean;
}

const ItemThemMonFix = React.memo((props: Props) => {
  const {monAn, intialSoLuong, onQuantityChange, onChangeChiTiets} = props;

  const [soLuong, setSoLuong] = useState<number>(intialSoLuong);

  const anhMonAn = monAn.anhMonAn
    ? monAn.anhMonAn.replace('localhost', `${IPV4}`)
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

  const handlePlus = useCallback(() => {
    setSoLuong(prev => prev + 1);
  }, []);

  const handleMinus = useCallback(() => {
    setSoLuong(prev => Math.max(0, prev - 1));
  }, []);

  useEffect(() => {
    if (onChangeChiTiets) {
      setSoLuong(intialSoLuong);
    }
  }, [onChangeChiTiets]);

  useEffect(() => {
    onQuantityChange(
      monAn._id as string,
      soLuong,
      monAn.tenMon,
      monAn.giaMonAn,
    );
  }, [soLuong]);

  return (
    <View
      style={{
        elevation: 5,
        marginVertical: 2,
        borderRadius: 8,
        marginHorizontal: 5,
      }}>
      <CardComponent
        styles={[
          {
            padding: 8,
            backgroundColor: monAn.trangThai ? colors.white : '#FFD2CD',
            borderColor: colors.desc2,
          },
        ]}
        flex={1}
        evlation={5}>
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
                  text={monAn.tenMon}
                  fontWeight="bold"
                  color={colors.text2}
                  size={15}
                  minHeight={28}
                  numberOfLines={1}
                />
                <SpaceComponent width={10} />
              </RowComponent>
              {monAn.trangThai ? (
                <TextComponent
                  text={`${formatMoney(monAn.giaMonAn)}`}
                  minHeight={28}
                />
              ) : (
                <TextComponent
                  text={`Ngưng phục vụ`}
                  minHeight={28}
                  color={colors.desc}
                />
              )}
            </View>
          </View>
          {monAn.trangThai ? (
            <View
              style={{
                justifyContent: 'center',
                marginRight: 8,
              }}>
              <RowComponent styles={{alignItems: 'center'}}>
                <TouchableOpacity style={{padding: 5}} onPress={handleMinus}>
                  <Icon name="minus" size={14} color={colors.text2} />
                </TouchableOpacity>
                <SpaceComponent width={10} />
                <TextComponent
                  text={soLuong.toString()}
                  color={colors.text2}
                  size={16}
                />
                <SpaceComponent width={10} />
                <TouchableOpacity style={{padding: 5}} onPress={handlePlus}>
                  <Icon name="plus" size={14} color={colors.text2} />
                </TouchableOpacity>
              </RowComponent>
            </View>
          ) : null}
        </RowComponent>
      </CardComponent>
    </View>
  );
});

export default ItemThemMonFix;
