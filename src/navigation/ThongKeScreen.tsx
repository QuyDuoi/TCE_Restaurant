import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ThongKeDoanhThu from '../screens/ThongKe/ThongKeDoanhThu';
import ThongKeTop5MonAn from '../screens/ThongKe/ThongKeTop5MonAn';
import ThongKeNguonDoanhThu from '../screens/ThongKe/ThongKeNguonDoanhThu';
import ThongKeHinhThucThanhToan from '../screens/ThongKe/ThongKeHinhThucThanhToan';

const ThongKeStack = createStackNavigator();

function ThongKeScreen(): React.JSX.Element {
  return (
    <ThongKeStack.Navigator initialRouteName="ThongKeDoanhThu">
      <ThongKeStack.Screen
        name="ThongKeDoanhThu"
        component={ThongKeDoanhThu}
        options={{title: 'Thống kê doanh thu', headerTitleAlign: 'center'}}
      />
      <ThongKeStack.Screen
        name="ThongKeTop5MonAn"
        component={ThongKeTop5MonAn}
        options={{title: 'Thống Kê Top 5 món ăn', headerTitleAlign: 'center'}}
      />
      <ThongKeStack.Screen
        name="ThongKeNguonDoanhThu"
        component={ThongKeNguonDoanhThu}
        options={{
          title: 'Thống Kê Nguồn doanh thu',
          headerTitleAlign: 'center',
        }}
      />
      <ThongKeStack.Screen
        name="ThongKeHinhThucThanhToan"
        component={ThongKeHinhThucThanhToan}
        options={{
          title: 'Thống Kê Hình thức thanh toán',
          headerTitleAlign: 'center',
        }}
      />
    </ThongKeStack.Navigator>
  );
}

export default ThongKeScreen;
