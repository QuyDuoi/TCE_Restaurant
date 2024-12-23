import {View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';

interface Props {
  name: string;
  styles?: StyleProp<ViewStyle>;
  isExpanded?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

const ItemKhuVuc = (props: Props) => {
  const {name, styles, isExpanded, onPress, onLongPress} = props;

  return (
    <View style={[{}, styles]}>
      <RowComponent
        justify="space-between"
        onPress={onPress}
        onLongPress={onLongPress}
        styles={{
          paddingVertical: 10,

          paddingHorizontal: 5,
        }}>
        <TextComponent
          text={`Khu vực: ${name ? name : 'Tầng 1'}`}
          size={17}
          color={colors.black}
        />
        <Icon
          onPress={onPress ? () => onPress() : undefined}
          name={isExpanded ? 'chevron-down' : 'chevron-right'}
          size={17}
          style={{alignSelf: 'center'}}
        />
      </RowComponent>
    </View>
  );
};

export default ItemKhuVuc;
