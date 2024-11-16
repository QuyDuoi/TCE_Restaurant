import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ThongKeDoanhThu from '../screens/ThongKe/ThongKeDoanhThu';
import ThongKeTop5MonAn from '../screens/ThongKe/ThongKeTop5MonAn';
import ThongKeNguonDoanhThu from '../screens/ThongKe/ThongKeNguonDoanhThu';
import ThongKeHinhThucThanhToan from '../screens/ThongKe/ThongKeHinhThucThanhToan';

const ThongKeStack = createStackNavigator();

function ThongKeScreen({navigation, route}: {navigation: any; route: any}): React.JSX.Element {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ThongKeDoanhThu';
    let title = 'Thống kê';
    switch (routeName) {
      case 'ThongKeDoanhThu':
        title = 'Thống kê doanh thu';
        break;
      case 'ThongKeTop5MonAn':
        title = 'Thống kê Top 5 món ăn';
        break;
      case 'ThongKeNguonDoanhThu':
        title = 'Thống kê nguồn doanh thu';
        break;
      case 'ThongKeHinhThucThanhToan':
        title = 'Thống kê hình thức thanh toán';
        break;
      default:
        break;
    }
    navigation.setOptions({title});
  }, [navigation, route]);

  return (
    <ThongKeStack.Navigator initialRouteName="ThongKeDoanhThu" screenOptions={{headerShown: false}}>
      <ThongKeStack.Screen
        name="ThongKeDoanhThu"
        component={ThongKeDoanhThu}
      />
      <ThongKeStack.Screen
        name="ThongKeTop5MonAn"
        component={ThongKeTop5MonAn}
      />
      <ThongKeStack.Screen
        name="ThongKeNguonDoanhThu"
        component={ThongKeNguonDoanhThu}
      />
      <ThongKeStack.Screen
        name="ThongKeHinhThucThanhToan"
        component={ThongKeHinhThucThanhToan}
      />
    </ThongKeStack.Navigator>
  );
}

export default ThongKeScreen;
