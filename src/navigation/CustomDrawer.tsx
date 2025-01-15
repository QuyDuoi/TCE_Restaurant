import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import TextComponent from '../screens/QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import SpaceComponent from '../screens/QuanLyThucDon/Hoa/components/SpaceComponent';
import { useToast } from '../customcomponent/CustomToast';

export interface UserLogin {
  _id: string;
  hoTen: string;
  hinhAnh: string;
  soDienThoai: string;
  cccd: string;
  vaiTro: string;
  trangThai: boolean;
  id_nhaHang: {
    _id: string;
    tenNhaHang: string;
    hinhAnh: string;
    soDienThoai: string;
    diaChi: string;
    soTaiKhoan: string;
    chuTaiKhoan: string;
    nganHang: string;
  };
}

const CustomDrawer = (props: any) => {
  const {userInfo} = props;
  const navigation = useNavigation();
  const {showToast} = useToast();

  const logOut = async () => {
    try {
      await EncryptedStorage.removeItem('userSession');
      await EncryptedStorage.removeItem('nhanVien');
      await EncryptedStorage.clear();
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      showToast('check', 'Đăng xuất thành công.', '#D1E4B3', 2000);
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.headerContainer]}>
        <View style={{width: '100%'}}>
          <TextComponent
            text={`Nhà hàng ${userInfo?.id_nhaHang.tenNhaHang || ''}`}
            styles={styles.textNhaHang}
            numberOfLines={1}
          />
          <TextComponent
            text={`Địa chỉ: ${userInfo?.id_nhaHang.diaChi || ''}`}
            styles={styles.textNhaHang}
            numberOfLines={1}
          />
        </View>
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Image
            source={{
              uri: userInfo?.hinhAnh,
            }}
            style={styles.image}
          />
          <View>
            <TextComponent
              text={userInfo?.hoTen || ''}
              styles={styles.text2}
              numberOfLines={1}
            />
            <SpaceComponent height={2} />
            <TextComponent
              text={`Vai trò ${userInfo?.vaiTro || ''}`}
              styles={styles.text1}
              numberOfLines={1}
            />
          </View>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}>
        <View style={[styles.listItem]}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        icon={() => <Icon name="logout" size={23} color={colors.black} />}
        label="Đăng xuất"
        onPress={logOut}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    backgroundColor: '#4da6ff',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  listItem: {
    marginTop: 10,
    flex: 1,
  },
  text1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  text2: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  textNhaHang: {
    textAlign: 'right',
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default CustomDrawer;
