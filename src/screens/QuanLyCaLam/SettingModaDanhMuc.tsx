import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ModalComponent from '../QuanLyThucDon/Hoa/components/ModalComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import ModalThemSuaDanhMuc from '../QuanLyThucDon/ModalThemSuaDanhMuc';

interface Props {
  visible: boolean;
  onClose?: () => void;
  navigation: any;
}

const SettingModaDanhMuc = ({visible, onClose, navigation}: Props) => {
  const [isModalThemDanhMuc, setModalThemDanhMuc] = useState(false);
  return (
    <ModalComponent visible={visible} onClose={onClose}>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <ButtonComponent
          title="Thêm món ăn"
          onPress={() => {
            navigation.navigate('ThemMonAn'); // Điều hướng đến màn hình ThemMonAn
            onClose && onClose(); // Đóng modal sau khi điều hướng
          }}
          activeOpacity={0.2}
        />
        <SpaceComponent height={10} />
        <View style={styles.indicator} />
        <SpaceComponent height={15} />
        <ButtonComponent
          title="Thêm danh mục"
          onPress={() => {
            setModalThemDanhMuc(true);
          }}
          activeOpacity={0.2}
        />
        <SpaceComponent height={10} />
        <View style={styles.indicator} />
        <SpaceComponent height={15} />
        <ButtonComponent
          title="Cập nhật danh mục"
          onPress={() => {
            navigation.navigate('CapNhatDanhMuc'); // Điều hướng đến màn hình ThemMonAn
            onClose && onClose(); // Đóng modal sau khi điều hướng
          }}
          activeOpacity={0.2}
        />
        <SpaceComponent height={10} />
        <View style={styles.indicator} />
      </View>

      <ModalThemSuaDanhMuc
        visible={isModalThemDanhMuc}
        onClose={() => setModalThemDanhMuc(false)} // Đóng ModalThemSuaDanhMuc khi nhấn "Huỷ" hoặc "Xác nhận"
      />
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderWidth: 1,
    borderColor: colors.desc, // Sửa 'color' thành 'borderColor'
    width: '50%',
  },
});

export default SettingModaDanhMuc;
