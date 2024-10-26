import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import MyTabs from './src/screens/QuanLyThucDon/TabView';
import DanhMucComponent from './src/screens/QuanLyThucDon/Hoa/components/DanhMucComponent';
import NhomToppingComponent from './src/screens/QuanLyThucDon/Hoa/components/NhomToppingComponent';
import NhanVienComponent from './src/screens/QuanLyNhanVien/NhanVienComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddEmployeeScreen from './src/screens/QuanLyNhanVien/themNhanVien'; // Màn hình thêm nhân viên
import ItemNhanVien from './src/screens/QuanLyNhanVien/ItemNhanVien';
import EditEmployeeInfo from './src/screens/QuanLyNhanVien/EditEmployeeInfo';
import EmployeeDetails from './src/screens/QuanLyNhanVien/EmployeeDetails';
import KhuVucTabView from './src/screens/QuanLyKhuVuc/Component/KhuVucTabView';
import QuanLyCaLam from './src/screens/QuanLyThucDon/Hoa/caLam/QuanLyCaLam';
import ProductDetailScreen from './src/screens/QuanLyThucDon/xemCTMonAn';
import ManThemMonAn from './src/screens/QuanLyThucDon/themMonAn';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <DrawerNavigator />
      </View>
    </Provider>
  );
}

export default App;
