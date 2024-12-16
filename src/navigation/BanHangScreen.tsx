import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useLayoutEffect} from 'react';
import QuanLyBanHang from '../screens/QuanLyBanHang/QuanLyBanHang';
import ChiTietHoaDonBMD from '../screens/QuanLyBanHang/ChiTietHoaDonBMD';
import BookingFlow from '../customcomponent/BookingFlow';
import InHoaDon from '../screens/inHoaDon/InHoaDon';

const BanHangStack = createNativeStackNavigator();

export const BanHangStackScreen = ({
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
        name="InHoaDon"
        component={InHoaDon}
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
