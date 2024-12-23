import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {UserLogin} from './CustomDrawer';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ButtonComponent from '../screens/QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({route, navigation}: any) => {
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
      console.log('Đăng xuất thành công');
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
    }
  };
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Profile';
    if (routeName === 'Profile') {
      // Chỉ hiển thị nút Tùy chọn nếu vai trò là 'Quản lý'
      navigation.setOptions({
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              logOut();
            }}>
            <Icon
              name="logout"
              size={25}
              color={colors.black}
              style={{
                marginRight: 10,
                marginBottom: 10,
              }}
            />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({headerShown: false});
    }
  }, [navigation, route]);

  const user: UserLogin = useSelector((state: RootState) => state.user);
  const nhanVien = user;
  const tenNhaHang = nhanVien.id_nhaHang.tenNhaHang.includes('Nhà hàng')
    ? nhanVien.id_nhaHang.tenNhaHang
    : 'Nhà hàng ' + nhanVien.id_nhaHang.tenNhaHang;

  useLayoutEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{tenNhaHang}</Text>

      <Image style={styles.avatar} source={{uri: nhanVien.hinhAnh}} />

      <Text style={styles.employeeName}>{nhanVien.hoTen}</Text>
      <View style={styles.box}>
        <Text
          style={[
            styles.statusText,
            nhanVien.trangThai ? styles.activeStatus : styles.inactiveStatus,
          ]}>
          {nhanVien.trangThai ? 'Hoạt động' : 'Ngừng hoạt động'}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <TouchableOpacity
          onPress={() => {
            console.log('goi dien');
          }}>
          <Icon name="phone" size={24} color="#777" />
        </TouchableOpacity>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Số điện thoại</Text>
          <Text style={styles.infoSubtitle}>{nhanVien.soDienThoai}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log('copy');
          }}></TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Icon name="credit-card" size={24} color="#777" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Số CCCD</Text>
          <Text style={styles.infoSubtitle}>{nhanVien.cccd}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="work" size={24} color="#777" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Vai trò</Text>
          <Text style={styles.infoSubtitle}>{nhanVien.vaiTro}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <Icon name="location-pin" size={24} color="#777" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Địa chỉ</Text>
          <Text style={styles.infoSubtitle}>{nhanVien.id_nhaHang.diaChi}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  employeeName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  box: {
    width: '100%',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginVertical: 10,
    width: '30%',
    height: 30,
  },
  activeStatus: {
    color: 'green',
    borderColor: 'green',
    borderWidth: 1,
  },
  inactiveStatus: {
    color: 'red',
    borderColor: 'red',
    borderWidth: 1,
    width: '45%',
    height: 30,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  infoTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
