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

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <DrawerNavigator />
      </View>
    </Provider>
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="NhanVienList">
    //       {/* Màn hình danh sách nhân viên */}
    //       <Stack.Screen
    //         name="NhanVienList"
    //         component={NhanVienComponent}
    //         options={{title: 'Danh sách nhân viên'}}
    //       />

    //       {/* Màn hình thêm nhân viên */}
    //       <Stack.Screen
    //         name="AddEmployee"
    //         component={AddEmployeeScreen}
    //         options={{title: 'Thêm nhân viên mới'}}
    //       />

    //       {/* Màn hình CT thông tin nhân viên */}
    //       <Stack.Screen
    //         name="employeeDetails"
    //         component={EmployeeDetails}
    //         options={{title: 'Thông tin nhân viên'}}
    //       />

    //       {/* Màn hình update thông tin nhân viên */}
    //       <Stack.Screen
    //         name="editEmployeeInfo"
    //         component={EditEmployeeInfo}
    //         options={{title: 'Sửa Thông tin nhân viên'}}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
  );
}

export default App;
