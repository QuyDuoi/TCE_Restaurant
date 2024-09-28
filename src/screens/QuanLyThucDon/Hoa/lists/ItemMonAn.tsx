import {View, Text, StyleProp, ViewStyle, Image, Switch} from 'react-native';
import React from 'react';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import {hoaStyles} from '../styles/hoaStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../contants/hoaColors';
import SpaceComponent from '../components/SpaceComponent';

interface Props {
  id?: number;
  nameFood: string;
  price: number;
  status: boolean;
  image: string;
  styles?: StyleProp<ViewStyle>;
  onStatusChange?: (status: boolean) => void;
  onPress?: () => void;
}

const ItemMonAn = (props: Props) => {
  const {styles, nameFood, price, status, image, onStatusChange, onPress, id} =
    props;

  const urlImage: string =
    image ||
    'https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg';

  const handleStatusChange = (value: boolean) => {
    onStatusChange?.(value);
  };

  return (
    <View
      style={[
        styles,
        {
          padding: 8,
        },
      ]}>
      <RowComponent justify="space-between" onPress={onPress}>
        <Image source={{uri: urlImage}} style={[hoaStyles.image]} />

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <View style={{alignItems: 'flex-start'}}>
            <RowComponent onPress={onPress}>
              <TextComponent
                text={nameFood}
                fontWeight="bold"
                color={colors.text2}
                size={15}
              />
              <SpaceComponent width={10} />
              <Icon
                name="chevron-right"
                size={14}
                color={colors.text2}
                style={{
                  paddingTop: 3,
                }}
              />
            </RowComponent>

            <TextComponent text={`${price.toLocaleString()}đ`} />
          </View>
        </View>

        <View>
          <TextComponent
            text={status ? 'Còn Hàng' : 'Hết Hàng'}
            color={colors.status}
          />
          <Switch
            value={status}
            onValueChange={handleStatusChange}
            trackColor={{false: colors.status2, true: colors.status}}
          />
        </View>
      </RowComponent>
    </View>
  );
};

export default ItemMonAn;
