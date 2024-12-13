import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';

interface Props {
  tenBan?: string;
  tenKhuVuc?: string;
  trangThai?: string;
  image?: any;
  onLongPress?: () => void;
}

const ItemBanSearch = (props: Props) => {
  const {tenBan, tenKhuVuc, trangThai, image, onLongPress} = props;
  return (
    <TouchableOpacity
      style={[
        {
          paddingHorizontal: 12,
          paddingVertical: 8,
        },
      ]}
      activeOpacity={0.9}
      onLongPress={onLongPress}>
      <RowComponent justify="space-between">
        <View style={[styles.imageContainer]}>
          <Image source={image} style={[styles.image]} />
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <View style={{alignItems: 'flex-start'}}>
            <TextComponent
              text={tenBan?.length == 1 ? 'Bàn ' + tenBan : tenBan ?? 'null'}
              fontWeight="bold"
              color={colors.text2}
              size={15}
            />
            <TextComponent
              text={tenKhuVuc ? `Khu vực: ${tenKhuVuc}` : 'null'}
              size={13}
              color={colors.desc}
            />
            <TextComponent
              text={trangThai ? `Trạng thái: ${trangThai}` : 'null'}
              size={13}
              color={colors.desc}
            />
          </View>
        </View>
      </RowComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 55,
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.desc2,
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});

export default ItemBanSearch;
