import React, {useLayoutEffect} from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import NhanVienStackScreen from './NhanVienScreen';
import ThucDonStackScreen from './ThucDonScreen';
import FoodOrderScreen from '../screens/QuanLyLenMon/FoodOderScreen';
import BillScreen from '../screens/QuyetToanHoaDon/BillScreen';
import ThongKeScreen from './ThongKeScreen';
import CaLamStackScreen from './CaLamStackScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChiTietHoaDonScreen from '../screens/QuanLyThucDon/Hoa/caLam/chiTietHoaDon/ChiTietHoaDonScreen';
import ThemMonScreen from '../screens/QuanLyThucDon/Hoa/caLam/chiTietHoaDon/ThemMonScreen';
import KhuVucStackScreen from './KhuVucScreen';
import InHoaDon from '../screens/inHoaDon/InHoaDon';
import QuanLyBanHang from '../screens/QuanLyThucDon/Hoa/banHang/QuanLyBanHang';
import ChiTietHoaDonBMD from '../screens/QuanLyThucDon/Hoa/banHang/ChiTietHoaDonBMD';
import BookingFlow from '../customcomponent/BookingFlow';
import CustomDrawer from './CustomDrawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';

const Drawer = createDrawerNavigator();
const BillStack = createNativeStackNavigator();
const BanHangStack = createNativeStackNavigator();

const BillStackScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'BillScreen';
    if (routeName === 'BillScreen') {
      navigation.setOptions({headerShown: true});
    } else if (routeName === 'ChiTietHoaDonScreen') {
      navigation.setOptions({headerShown: false});
    } else if (routeName === 'ThemMonScreen') {
      navigation.setOptions({headerShown: false});
    } else if (routeName === 'InHoaDon') {
      navigation.setOptions({headerShown: false});
    } else {
      navigation.setOptions({headerShown: true});
    }
  }, [navigation, route]);

  return (
    <BillStack.Navigator>
      <BillStack.Screen
        name="BillScreen"
        component={BillScreen}
        options={{headerShown: false}}
      />
      <BillStack.Screen
        name="ChiTietHoaDonScreen"
        component={ChiTietHoaDonScreen}
        options={{headerShown: false}}
      />
      <BillStack.Screen
        name="ThemMonScreen"
        component={ThemMonScreen}
        options={{headerShown: false}}
      />
      <BillStack.Screen
        name="InHoaDon"
        component={InHoaDon}
        options={{headerShown: false}}
      />
    </BillStack.Navigator>
  );
};

const BanHangStackScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'QuanLyBanHang';
    if (routeName === 'QuanLyBanHang') {
      navigation.setOptions({headerShown: true, swipeEnabled: true});
    } else {
      navigation.setOptions({
        headerShown: false,
        swipeEnabled: false,
      });
    }
  }, [navigation, route]);

  return (
    <BanHangStack.Navigator
      screenOptions={{
        animation: 'default',
      }}>
      <BanHangStack.Screen
        name="QuanLyBanHang"
        component={QuanLyBanHang}
        options={{headerShown: false}}
      />
      <BanHangStack.Screen
        name="ChiTietHoaDonBMD"
        component={ChiTietHoaDonBMD}
        options={{headerShown: false}}
      />
      <BanHangStack.Screen
        name="BookingFlow"
        component={BookingFlow}
        options={{headerShown: false}}
      />
    </BanHangStack.Navigator>
  );
};

function DrawerNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="NhanVien"
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: 'gray',
          drawerActiveBackgroundColor: '#ff8250',
          drawerLabelStyle: {
            marginLeft: -23,
            //fontSize: 13,
          },
        }}>
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
