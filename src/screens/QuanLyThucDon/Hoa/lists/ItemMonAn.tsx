import {View, Text, StyleProp, ViewStyle, Image, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import {hoaStyles} from '../styles/hoaStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../contants/hoaColors';
import SpaceComponent from '../components/SpaceComponent';
import {useDispatch} from 'react-redux';
import {updateMonAnThunk} from '../../../../store/MonAnSlice';
import {ipAddress, IPV4} from '../../../../services/api';

interface Props {
  id?: string;
  nameFood: string;
  price: number;
  status: boolean;
  image: string;
  styles?: StyleProp<ViewStyle>;
  onStatusChange?: (status: boolean) => void;
  onPress?: () => void;
}

const ItemMonAn = (props: Props) => {
  const {styles, nameFood, price, status, image, onPress, id} = props;

  const anhMonAn = image
    ? image.replace('localhost', `${IPV4}`)
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

  const dispatch = useDispatch();

  // Khởi tạo state cho trạng thái món ăn
  const [localStatus, setLocalStatus] = useState<boolean>(status);

  const handleStatusChange = async (value: boolean) => {
    if (id) {
      const formData = {
        trangThai: value,
      };
      // Gọi thunk để cập nhật trạng thái món ăn
      await dispatch(updateMonAnThunk({id, formData} as any) as any);
      setLocalStatus(value); // Cập nhật trạng thái địa phương sau khi gọi API thành công
    } else {
      console.error('ID của món ăn không tồn tại.');
    }
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
            <RowComponent onPress={onPress}>
              <TextComponent
                text={nameFood}
                fontWeight="bold"
                color={colors.text2}
                size={15}
                minHeight={28}
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

            <TextComponent text={`${price.toLocaleString()}đ`} minHeight={28} />
          </View>
        </View>

        <View>
          <TextComponent
            text={localStatus ? 'Còn Hàng' : 'Hết Hàng'}
            color={colors.status}
            minHeight={28}
          />
          <Switch
            value={localStatus}
            onValueChange={handleStatusChange}
            trackColor={{false: colors.status2, true: colors.status}}
          />
        </View>
      </RowComponent>
    </View>
  );
};

export default ItemMonAn;
