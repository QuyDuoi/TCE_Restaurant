import React, { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import NhanVienComponent from "../screens/QuanLyNhanVien/NhanVienComponent";
import AddEmployeeScreen from "../screens/QuanLyNhanVien/themNhanVien";
import EmployeeDetails from "../screens/QuanLyNhanVien/EmployeeDetails";
import EditEmployeeInfo from "../screens/QuanLyNhanVien/EditEmployeeInfo";

const NhanVienStack = createStackNavigator();

function NhanVienStackScreen({navigation, route}: {navigation: any; route: any}) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'NhanVienList';

    if (routeName === 'NhanVienList') {
      navigation.setOptions({ headerShown: true });
    } else {
      navigation.setOptions({ headerShown: false });
    }
  }, [navigation, route]);

  return (
    <NhanVienStack.Navigator initialRouteName="NhanVienList">
      {/* Màn hình danh sách nhân viên */}
      <NhanVienStack.Screen
        name="NhanVienList"
        component={NhanVienComponent}
        options={{ title: 'Danh sách nhân viên', headerShown: false }}
      />
      
      {/* Màn hình thêm nhân viên */}
      <NhanVienStack.Screen
        name="AddEmployee"
        component={AddEmployeeScreen}
        options={{ title: 'Thêm nhân viên mới' }}
      />
      
      {/* Màn hình chi tiết thông tin nhân viên */}
      <NhanVienStack.Screen
        name="EmployeeDetails"
        component={EmployeeDetails}
        options={{ title: 'Thông tin nhân viên' }}
      />
      
      {/* Màn hình cập nhật thông tin nhân viên */}
      <NhanVienStack.Screen
        name="EditEmployeeInfo"
        component={EditEmployeeInfo}
        options={{ title: 'Cập nhật thông tin nhân viên' }}
      />
    </NhanVienStack.Navigator>
  );
};

export default NhanVienStackScreen;
