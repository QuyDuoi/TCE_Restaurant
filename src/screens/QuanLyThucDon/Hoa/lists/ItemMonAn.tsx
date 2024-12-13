import {View, Text, StyleProp, ViewStyle, Image, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import {hoaStyles} from '../styles/hoaStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../contants/hoaColors';
import SpaceComponent from '../components/SpaceComponent';
import {useDispatch, useSelector} from 'react-redux';
import {updateStatusMonAnThunk} from '../../../../store/Thunks/monAnThunks';
import {ipAddress, IPV4} from '../../../../services/api';
import {UserLogin} from '../../../../navigation/CustomDrawer';

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
  const user: UserLogin = useSelector(state => state.user);

  const anhMonAn = image
    ? image.replace('localhost', `${IPV4}`)
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

  const dispatch = useDispatch();

  // Khởi tạo state cho trạng thái món ăn
  const [localStatus, setLocalStatus] = useState<boolean>(status);

  const handleStatusChange = async (value: boolean) => {
    if (id) {
      const trangThai = value;
      // Gọi thunk để cập nhật trạng thái món ăn
      await dispatch(updateStatusMonAnThunk({id, trangThai} as any) as any);
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
          paddingVertical: 8,
          backgroundColor: 'white',
          marginHorizontal: 5,
          marginVertical: 2,
        },
      ]}>
      <RowComponent
        styles={{alignItems: 'center'}}
        justify="space-between"
        onPress={onPress}>
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
            <RowComponent
              styles={{alignItems: 'center', width: '90%'}}
              onPress={onPress}>
              <TextComponent
                text={nameFood}
                fontWeight="bold"
                color={colors.text2}
                size={15}
                ellipsizeMode="tail"
                numberOfLines={1}
              />
              <SpaceComponent width={10} />
              <Icon name="chevron-right" size={14} color={colors.text2} />
            </RowComponent>

            <TextComponent
              text={`${price.toLocaleString()} đ`}
              minHeight={28}
            />
          </View>
        </View>

        <View>
          <TextComponent
            text={localStatus ? 'Sẵn sàng' : 'Ngưng phục vụ'}
            color={colors.status}
            minHeight={24}
          />
          <Switch
            value={localStatus}
            onValueChange={handleStatusChange}
            trackColor={{false: colors.status2, true: colors.status}}
            disabled={user.vaiTro !== 'Quản lý'}
          />
        </View>
      </RowComponent>
    </View>
  );
};

export default ItemMonAn;
