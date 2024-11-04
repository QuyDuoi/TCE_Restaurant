import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import RowComponent from '../../components/RowComponent';
import {colors} from '../../contants/hoaColors';
import TextComponent from '../../components/TextComponent';
import CardComponent from '../../components/CardComponent';
import {formatMoney} from '../../utils/formatUtils';

interface Props {
  chiTiet: {
    id_monAn: string;
    soLuongMon: number;
    tenMon: string;
    giaMon: string;
  };
}

const ItemCart = (props: Props) => {
  const {chiTiet} = props;
  return (
    <View style={styles.container}>
      <RowComponent
        justify="space-between"
        styles={{
          borderBottomWidth: 1,
          borderColor: colors.desc2,
          borderStartWidth: 1,
          borderEndWidth: 1,
        }}>
        <View
          style={{
            width: '50%',
            alignItems: 'flex-start',
            paddingVertical: 10,
            borderRightWidth: 1,
            borderColor: colors.desc2,
          }}>
          <TextComponent
            text={chiTiet.tenMon}
            styles={[styles.text, {paddingLeft: 8}]}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <TextComponent
            text={chiTiet.soLuongMon.toString()}
            styles={styles.text}
          />
        </View>
        <View
          style={{
            width: '32%',
            alignItems: 'center',
            paddingVertical: 10,
            borderLeftWidth: 1,
            borderColor: colors.desc2,
          }}>
          <CardComponent
            styles={{
              backgroundColor: colors.gray,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 12,
            }}>
            <TextComponent
              text={`${formatMoney(chiTiet.giaMon as any)}`}
              color={colors.black}
            />
          </CardComponent>
        </View>
      </RowComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: colors.black,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  indicator: {
    width: '100%',
    height: 1 * 1.5,
    backgroundColor: colors.desc2,
  },
});

export default ItemCart;
