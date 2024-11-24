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

const BanHangStackScreen = () => {
  return (
    <BanHangStack.Navigator>
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
      <Drawer.Navigator initialRouteName="NhanVien">
        <Drawer.Screen
          name="NhanVien"
          component={NhanVienStackScreen}
          options={{
            title: 'Quản lý nhân viên',
          }}
        />
        <Drawer.Screen
          name="ThucDon"
          component={ThucDonStackScreen}
          options={{title: 'Quản lý thực đơn'}}
        />
        <Drawer.Screen
          name="CaLam"
          component={CaLamStackScreen}
          options={{
            title: 'Quản lý ca',
          }}
        />
        <Drawer.Screen
          name="KhuVuc"
          component={KhuVucStackScreen}
          options={{
            title: 'Quản lý khu vực',
          }}
        />
        <Drawer.Screen
          name="LenMon"
          component={FoodOrderScreen}
          options={{
            title: 'Quản lý lên món',
          }}
        />
        <Drawer.Screen
          name="HoaDon"
          component={BillStackScreen}
          options={{
            title: 'Quyết toán hóa đơn',
          }}
        />
        <Drawer.Screen
          name="BanHang"
          component={BanHangStackScreen}
          options={{
            title: 'Quản lý bán hàng',
          }}
        />
        <Drawer.Screen
          name="ThongKe"
          options={{
            title: 'Thống kê',
          }}>
          {props => <ThongKeScreen {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
