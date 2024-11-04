import {View, Text, Switch, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import RowComponent from '../../components/RowComponent';
import {hoaStyles} from '../../styles/hoaStyles';
import {colors} from '../../contants/hoaColors';
import TextComponent from '../../components/TextComponent';
import SpaceComponent from '../../components/SpaceComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardComponent from '../../components/CardComponent';
import {MonAn} from '../../../../../store/MonAnSlice';
import {formatMoney} from '../../utils/formatUtils';
import {IPV4} from '../../../../../services/api';

interface Props {
  monAn: MonAn;
  soLuong: number;
  onMinus: () => void;
  onPlus: () => void;
}

const ItemThemMon = React.memo((props: Props) => {
  const {monAn, soLuong, onMinus, onPlus} = props;

  const anhMonAn = monAn.anhMonAn
    ? monAn.anhMonAn.replace('localhost', `${IPV4}`)
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

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
            backgroundColor: colors.white,
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

              <TextComponent
                text={`${formatMoney(monAn.giaMonAn)}`}
                minHeight={28}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginRight: 8,
            }}>
            <RowComponent styles={{alignItems: 'center'}}>
              <TouchableOpacity style={{padding: 5}} onPress={onMinus}>
                <Icon name="minus" size={14} color={colors.text2} />
              </TouchableOpacity>
              <SpaceComponent width={10} />
              <TextComponent
                text={soLuong.toString()}
                color={colors.text2}
                size={16}
              />
              <SpaceComponent width={10} />
              <TouchableOpacity style={{padding: 5}} onPress={onPlus}>
                <Icon name="plus" size={14} color={colors.text2} />
              </TouchableOpacity>
            </RowComponent>
          </View>
        </RowComponent>
      </CardComponent>
    </View>
  );
});

export default ItemThemMon;
