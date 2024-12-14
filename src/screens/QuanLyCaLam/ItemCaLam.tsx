import {View} from 'react-native';
import React from 'react';
import CardComponent from '../QuanLyThucDon/Hoa/components/CardComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import {formatDate, formatTime} from '../QuanLyThucDon/Hoa/utils/formatUtils';

interface Props {
  batDau?: string;
  ketThuc?: string;
  nhanVienMoCa: string;
  onPress?: () => void;
  type?: string;
}

const ItemCaLam = (props: Props) => {
  const {batDau, nhanVienMoCa, onPress, ketThuc} = props;

  const batDauTime = batDau ? new Date(batDau) : new Date();
  const ketThucTime = ketThuc ? new Date(ketThuc) : undefined;

  return (
    <CardComponent
      evlation={1}
      styles={[
        {
          marginBottom: 15,
          borderRadius: 15,
          paddingVertical: 5,
        },
      ]}
      flex={1}>
      <RowComponent
        justify="space-between"
        styles={[
          {
            margin: 8,
          },
        ]}>
        <View
          style={[
            {
              justifyContent: 'flex-start',
              flex: 1,
            },
          ]}>
          <TitleComponent
            text={`Ngày: ${formatDate(batDauTime)} ${
              ketThuc ? '' : '(ca hiện tại)'
            }`}
            size={15}
            numberOfLines={1}
          />
          <TextComponent
            text={`Thời gian mở: ${formatTime(batDauTime)}`}
            color={colors.desc}
          />
          <TextComponent
            text={`Thời gian đóng: ${
              ketThucTime ? formatTime(ketThucTime) : 'Đang mở'
            }`}
            color={colors.desc}
          />
          <TextComponent
            text={`Nhân viên mở: ${nhanVienMoCa}`}
            numberOfLines={1}
            ellipsizeMode="tail"
            color={colors.desc}
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <ButtonComponent
            title="Xem chi tiết"
            onPress={
              onPress
                ? onPress
                : () => {
                    type: 'QuanLyCaLam';
                  }
            }
            bgrColor={colors.orange}
            boderRadius={20}
            styles={{
              padding: 7,
            }}
            titleSize={15}
            titleColor={colors.white}
          />
        </View>
      </RowComponent>
    </CardComponent>
  );
};

export default ItemCaLam;
