import {View, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import {hoaStyles} from '../../QuanLyThucDon/Hoa/styles/hoaStyles';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardComponent from '../../QuanLyThucDon/Hoa/components/CardComponent';
import {MonAn} from '../../../store/Slices/MonAnSlice';
import {formatMoney} from '../../QuanLyThucDon/Hoa/utils/formatUtils';

interface Props {
  monAn: MonAn;
  intialSoLuong: number;
  onQuantityChange: (
    idMonAn: string,
    newQuantity: number,
    tenMon: string,
    giaMon: number,
  ) => void;
  onChange?: (val: boolean) => void;
}
const ItemThemMon = React.memo((props: Props) => {
  const {monAn, intialSoLuong, onQuantityChange, onChange} = props;

  const [soLuong, setSoLuong] = useState<number>(intialSoLuong);

  const handlePlus = useCallback(() => {
    setSoLuong(prev => prev + 1);
  }, []);

  const handleMinus = useCallback(() => {
    setSoLuong(prev => Math.max(0, prev - 1));
  }, []);

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
              uri: monAn.anhMonAn,
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
                <TouchableOpacity
                  style={{padding: 5}}
                  onPress={() => {
                    onChange?.(true);
                    handleMinus();
                  }}>
                  <Icon name="minus" size={14} color={colors.text2} />
                </TouchableOpacity>
                <SpaceComponent width={10} />
                <TextComponent
                  text={soLuong.toString()}
                  color={colors.text2}
                  size={16}
                />
                <SpaceComponent width={10} />
                <TouchableOpacity
                  style={{padding: 5}}
                  onPress={() => {
                    onChange?.(true);
                    handlePlus();
                  }}>
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

export default ItemThemMon;
