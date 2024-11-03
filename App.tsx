import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import NhanVienComponent from './src/screens/QuanLyNhanVien/NhanVienComponent';
// import AddEmployeeScreen from './src/screens/QuanLyNhanVien/themNhanVien';
// import ItemNhanVien from './src/screens/QuanLyNhanVien/ItemNhanVien';
// import EditEmployeeInfo from './src/screens/QuanLyNhanVien/EditEmployeeInfo';
// import EmployeeDetails from './src/screens/QuanLyNhanVien/EmployeeDetails';
import ThongKeDoanhThu from './src/screens/ThongKe/ThongKeDoanhThu';
import ThongKeTop5MonAn from './src/screens/ThongKe/ThongKeTop5MonAn';
import ThongKeNguonDoanhThu from './src/screens/ThongKe/ThongKeNguonDoanhThu';
import ThongKeHinhThucThanhToan from './src/screens/ThongKe/ThongKeHinhThucThanhToan';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer >
        
        <Stack.Navigator initialRouteName="ThongKeDoanhThu">
        
         
         <Stack.Screen
            name="ThongKeDoanhThu"
            component={ThongKeDoanhThu}
            options={{title: 'Thống kê doanh thu', headerTitleAlign: 'center'}}
          />
          <Stack.Screen
            name="ThongKeTop5MonAn"
            component={ThongKeTop5MonAn}
            options={{title: 'Thống Kê Top 5 món ăn', headerTitleAlign: 'center'}}
          />
          <Stack.Screen
            name="ThongKeNguonDoanhThu"
            component={ThongKeNguonDoanhThu}
            options={{title: 'Thống Kê Nguồn doanh thu', headerTitleAlign: 'center'}}
          />
          <Stack.Screen
            name="ThongKeHinhThucThanhToan"
            component={ThongKeHinhThucThanhToan}
            options={{title: 'Thống Kê Hình thức thanh toán', headerTitleAlign: 'center'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;






