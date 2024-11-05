import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import NhanVienStackScreen from './NhanVienScreen';
import ThucDonStackScreen from './ThucDonScreen';
import KhuVucTabView from '../screens/QuanLyKhuVuc/Component/KhuVucTabView';
import FoodOrderScreen from '../screens/QuanLyLenMon/FoodOderScreen';
import BillScreen from '../screens/QuyetToanHoaDon/BillScreen';
import ThongKeScreen from './ThongKeScreen';
import CaLamStackScreen from './CaLamStackScreen';

const Drawer = createDrawerNavigator();

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
          component={KhuVucTabView}
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
          component={BillScreen}
          options={{
            title: 'Quyết toán hóa đơn',
          }}
        />
        <Drawer.Screen
          name="ThongKe"
          component={ThongKeScreen}
          options={{
            title: 'Thống kê',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
