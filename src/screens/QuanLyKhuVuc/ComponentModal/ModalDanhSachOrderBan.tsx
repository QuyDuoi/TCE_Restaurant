import {View, FlatList, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import ModalComponent from '../../QuanLyThucDon/Hoa/components/ModalComponent';
import ItemDanhSachOrder from './ItemDanhSachOrder';
import LoadingModal from 'react-native-loading-modal';
import {tuChoiBanOrder, xacNhanBanOrder} from '../../../services/api';
import {UserLogin} from '../../../navigation/CustomDrawer';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

interface Props {
  visible: boolean;
  onClose: () => void;
  danhSachOrder?: any;
  selectedBan?: any;
}

const ModalDanhSachOrderBan = (props: Props) => {
  const {visible, onClose, danhSachOrder, selectedBan} = props;
  const tenBan = selectedBan?.tenBan;
  const tenKhuVuc = selectedBan?.kv.tenKhuVuc;

  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const user: UserLogin = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoadingModal) {
      setTimeout(() => {
        setIsLoadingModal(false);
      }, 5000);
    }
  }, [isLoadingModal]);

  const handleConfirm = async () => {
    setIsLoadingModal(true);
    const result = await xacNhanBanOrder(selectedBan._id, user._id);
    if (result.ok) {
      setIsLoadingModal(false);
      ToastAndroid.show('Xác nhận thành công', ToastAndroid.SHORT);
    } else {
      setTimeout(() => {
        setIsLoadingModal(false);
      }, 2000);
      ToastAndroid.show('Không thành công', ToastAndroid.SHORT);
    }
    onClose();
  };

  const handleCancel = async () => {
    setIsLoadingModal(true);
    const result = await tuChoiBanOrder(selectedBan._id, user._id);
    if (result.ok) {
      setIsLoadingModal(false);
      ToastAndroid.show('Từ chối thành công', ToastAndroid.SHORT);
    } else {
      setTimeout(() => {
        setIsLoadingModal(false);
      }, 2000);
      ToastAndroid.show('Không thành công', ToastAndroid.SHORT);
    }
    onClose();
  };

  const renderHeader = () => {
    return (
      <View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TitleComponent
            text="Danh sách món"
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
      <RowComponent justify="space-between" styles={{paddingVertical: 10}}>
        <ButtonComponent
          title="Từ chối"
          onPress={handleCancel}
          styles={{
            width: '40%',
            height: 35,
          }}
          titleSize={15}
          bgrColor={'#f8d7da'}
          titleFontWeight="600"
          titleColor={colors.red}
        />
        <ButtonComponent
          title="Xác nhận"
          onPress={handleConfirm}
          styles={{
            width: '40%',
            height: 35,
          }}
          titleSize={15}
          bgrColor={'rgba(222, 247, 232, 1)'}
          titleFontWeight="600"
          titleColor="rgba(60, 138, 86, 1)"
        />
      </RowComponent>
    );
  };
  const renderItem = (item: {
    id_monAn?: string;
    soLuongMon: number;
    tenMon: string;
    giaMon: number;
    giaMonAn?: number;
  }) => {
    return (
      <View>
        <ItemDanhSachOrder item={item} />
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
    <>
      <ModalComponent visible={visible} onClose={onClose} borderRadius={3}>
        <FlatList
          data={danhSachOrder}
          renderItem={({item}) => renderItem(item)}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </ModalComponent>
      <LoadingModal modalVisible={isLoadingModal} color={colors.orange} />
    </>
  );
};

export default ModalDanhSachOrderBan;
