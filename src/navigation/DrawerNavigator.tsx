import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import NhanVienStackScreen from './NhanVienScreen';
import ThucDonStackScreen from './ThucDonScreen';
import FoodOrderScreen from '../screens/QuanLyLenMon/FoodOderScreen';
import ThongKeScreen from './ThongKeScreen';
import CaLamStackScreen from './CaLamStackScreen';
import KhuVucStackScreen from './KhuVucScreen';
import CustomDrawer, {styles, UserLogin} from './CustomDrawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator, Text, View} from 'react-native';
import {BillStackScreen} from './HoaDonScreen';
import {BanHangStackScreen} from './BanHangScreen';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../store/Slices/UserSlice';

const Drawer = createDrawerNavigator();

function DrawerNavigator({userInfo}): React.JSX.Element {
  const dispath = useDispatch();
  const user = useSelector(state => state.user);
  const [thongTinUser, setThongTinUser] = useState<UserLogin>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('UserInfo: ', user);

    if (user !== null) {
      setThongTinUser(user);
      console.log('Chay vao day ', userInfo);
    } else {
      setThongTinUser(userInfo);
      dispath(setUser(userInfo));
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ff8250" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="NhanVien"
      drawerContent={props => <CustomDrawer {...props} userInfo={thongTinUser} />}
      screenOptions={{
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'gray',
        drawerActiveBackgroundColor: '#ff8250',
        drawerLabelStyle: {
          marginLeft: -23,
          //fontSize: 13,
        },
      }}>
      {thongTinUser?.vaiTro === 'Quản lý' && (
        <Drawer.Screen
          name="NhanVien"
          component={NhanVienStackScreen}
          options={{
            title: 'Quản lý nhân viên',
            drawerIcon: ({color, size}) => (
              <View
                style={{
                  width: 30,
                  alignItems: 'center',
                }}>
                <Icon name="users" color={color} size={23} />
              </View>
            ),
          }}
        />
      )}
      <Drawer.Screen
        name="ThucDon"
        component={ThucDonStackScreen}
        options={{
          title: 'Quản lý thực đơn',
          drawerIcon: ({color, size}) => (
            <View
              style={{
                width: 30,
                alignItems: 'center',
              }}>
              <Icon name="cutlery" color={color} size={23} />
            </View>
          ),
        }}
      />
      {(thongTinUser?.vaiTro === 'Quản lý' ||
        thongTinUser?.vaiTro === 'Nhân viên thu ngân') && (
        <Drawer.Screen
          name="CaLam"
          component={CaLamStackScreen}
          options={{
            title: 'Quản lý ca',
            drawerIcon: ({color, size}) => (
              <View
                style={{
                  width: 30,
                  alignItems: 'center',
                }}>
                <Icon name="calendar" color={color} size={23} />
              </View>
            ),
          }}
        />
      )}
      <Drawer.Screen
        name="KhuVuc"
        component={KhuVucStackScreen}
        options={{
          title: 'Quản lý khu vực',
          drawerIcon: ({color, size}) => (
            <View
              style={{
                width: 30,
                alignItems: 'center',
              }}>
              <Ionicons name="grid" color={color} size={23} />
            </View>
          ),
        }}
      />
      {(thongTinUser?.vaiTro === 'Quản lý' || thongTinUser?.vaiTro === 'Đầu bếp') && (
        <Drawer.Screen
          name="LenMon"
          component={FoodOrderScreen}
          options={{
            title: 'Quản lý lên món',
            drawerIcon: ({color, size}) => (
              <View
                style={{
                  width: 30,
                  alignItems: 'center',
                }}>
                <MaterialIcons name="room-service" color={color} size={23} />
              </View>
            ),
          }}
        />
      )}
      {(thongTinUser?.vaiTro === 'Quản lý' ||
        thongTinUser?.vaiTro === 'Nhân viên thu ngân') && (
        <Drawer.Screen
          name="HoaDon"
          component={BillStackScreen}
          options={{
            title: 'Quyết toán hóa đơn',
            drawerIcon: ({color, size}) => (
              <View
                style={{
                  width: 30,
                  alignItems: 'center',
                }}>
                <Icon name="money" color={color} size={23} />
              </View>
            ),
          }}
        />
      )}
      {(thongTinUser?.vaiTro === 'Quản lý' ||
        thongTinUser?.vaiTro === 'Nhân viên thu ngân') && (
        <Drawer.Screen
          name="BanHang"
          component={BanHangStackScreen}
          options={{
            title: 'Quản lý bán hàng',
            drawerIcon: ({color, size}) => (
              <View
                style={{
                  width: 30,
                  alignItems: 'center',
                }}>
                <Icon name="inbox" color={color} size={23} />
              </View>
            ),
          }}
        />
      )}
      {(thongTinUser?.vaiTro === 'Quản lý' ||
        thongTinUser?.vaiTro === 'Nhân viên thu ngân') && (
        <Drawer.Screen
          name="ThongKe"
          options={{
            title: 'Thống kê',
            drawerIcon: ({color, size}) => (
              <View
                style={{
                  width: 30,
                  alignItems: 'center',
                }}>
                <Icon name="line-chart" color={color} size={23} />
              </View>
            ),
          }}>
          {props => <ThongKeScreen {...props} />}
        </Drawer.Screen>
      )}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
