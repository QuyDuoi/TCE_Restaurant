import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {hoaStyles} from '../../QuanLyThucDon/Hoa/styles/hoaStyles';
import CardComponent from '../../QuanLyThucDon/Hoa/components/CardComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';

interface Props {
  nameBan: string;
  nameKhuVuc: string;
  image?: any;
  onPress?: () => void;
}

const ItemTrangThaiBan = (props: Props) => {
  const {nameBan, nameKhuVuc, image, onPress} = props;
  return (
    <TouchableOpacity
      style={[styles.container]}
      activeOpacity={0.9}
      onLongPress={onPress}>
      <View style={[styles.content]}>
        <View style={[styles.imageContainer]}>
          <CardComponent
            flex={1}
            bgrColor={colors.desc2}
            styles={[{padding: 10}]}
            onLongPress={onPress}>
            <Image source={image} style={[styles.image]} />
          </CardComponent>
        </View>
        <View style={{}}>
          <SpaceComponent height={10} />
          <TextComponent text={nameKhuVuc} size={17} color={colors.text2} />
          <SpaceComponent height={2} />
          <TextComponent
            color={colors.desc}
            text={nameBan}
            styles={{
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    //backgroundColor: 'coral',
  },
  content: {
    alignItems: 'center',

    margin: 5,
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
});

export default ItemTrangThaiBan;
