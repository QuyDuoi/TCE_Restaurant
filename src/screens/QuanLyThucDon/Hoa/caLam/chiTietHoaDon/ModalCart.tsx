import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import React from 'react';
import ModalComponent from '../../components/ModalComponent';
import RowComponent from '../../components/RowComponent';
import TitleComponent from '../../components/TitleComponent';
import TextComponent from '../../components/TextComponent';
import {colors} from '../../contants/hoaColors';
import SpaceComponent from '../../components/SpaceComponent';
import ItemCart from './ItemCart';
import ButtonComponent from '../../components/ButtonComponent';

interface Props {
  visible: boolean;
  onClose: () => void;
  chiTiets: {
    id_monAn: string;
    soLuongMon: number;
    tenMon: string;
    giaMon: number;
  }[];
  tenBan?: string;
  tenKhuVuc?: string;
}

const ModalCart = (props: Props) => {
  const {visible, onClose, chiTiets, tenBan, tenKhuVuc} = props;
  //console.log(data.length);

  const renderHeader = () => {
    return (
      <View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TitleComponent
            text="Thêm món"
            size={19}
            fontWeight="700"
            color={colors.orange}
          />
          {tenBan && tenKhuVuc ? (
            <TextComponent
              text={`Bàn: ${tenBan} - ${tenKhuVuc}`}
              color={colors.desc}
            />
          ) : (
            <TextComponent text={`Mang đi`} color={colors.desc} />
          )}
        </View>
        <SpaceComponent height={22} />
        <View
          style={[
            {
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
              borderWidth: 1,
              borderColor: colors.desc2,
            },
          ]}>
          <RowComponent
            justify="space-between"
            styles={{backgroundColor: colors.gray}}>
            <View
              style={{
                width: '50%',
                paddingVertical: 10,
                borderRightWidth: 1,
                borderColor: colors.desc2,
              }}>
              <TitleComponent text="Món" styles={{paddingLeft: 8}} />
            </View>
            <View style={{paddingVertical: 10}}>
              <TitleComponent text="SL" />
            </View>
            <View
              style={{
                width: '32%',
                alignItems: 'center',
                paddingVertical: 10,
                borderLeftWidth: 1,
                borderColor: colors.desc2,
              }}>
              <TitleComponent text="Giá" />
            </View>
          </RowComponent>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <RowComponent justify="center" styles={{paddingVertical: 10}}>
        <ButtonComponent
          title="Đóng"
          onPress={onClose}
          styles={{
            width: '40%',
            height: 35,
          }}
          titleSize={15}
          bgrColor={colors.desc2}
          titleFontWeight="600"
        />
      </RowComponent>
    );
  };
  const renderItem = (item: {
    id_monAn: string;
    soLuongMon: number;
    tenMon: string;
    giaMon: number;
  }) => {
    return (
      <View>
        <ItemCart chiTiet={item} />
      </View>
    );
  };
  const renderEmpty = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          paddingVertical: 10,
        }}>
        <TextComponent text="Giỏ hàng trống" color={colors.desc} />
      </View>
    );
  };
  return (
    <ModalComponent visible={visible} onClose={onClose} borderRadius={3}>
      <FlatList
        data={chiTiets}
        renderItem={({item}) => renderItem(item)}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </ModalComponent>
  );
};

export default ModalCart;
