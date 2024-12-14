import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import InHoaDon from '../screens/inHoaDon/InHoaDon';
import ChiTietHoaDonScreen from '../screens/QuanLyCaLam/chiTietHoaDon/ChiTietHoaDonScreen';
import ThemMonScreen from '../screens/QuanLyCaLam/chiTietHoaDon/ThemMonScreen';
import BillScreen from '../screens/QuyetToanHoaDon/BillScreen';
import {useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const BillStack = createNativeStackNavigator();

export const BillStackScreen = ({
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
