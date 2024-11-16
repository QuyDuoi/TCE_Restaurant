import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import KhuVucTabView from "../screens/QuanLyKhuVuc/Component/KhuVucTabView";
import ChiTietHoaDonNVPV from "../screens/QuanLyKhuVuc/taoHoaDon/ChiTietHoaDonNVPV";
import ThemMonNVPV from "../screens/QuanLyKhuVuc/taoHoaDon/ThemMonNVPV";

const KhuVucStack = createNativeStackNavigator();

const KhuVucStackScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'KhuVucTabView';
    if (routeName === 'KhuVucTabView') {
      navigation.setOptions({headerShown: true});
    } else {
      navigation.setOptions({headerShown: false});
    }
  }, [navigation, route]);

  return (
    <KhuVucStack.Navigator>
      <KhuVucStack.Screen
        name="KhuVucTabView"
        component={KhuVucTabView}
        options={{headerShown: false}}
      />
      <KhuVucStack.Screen
        name="ChiTietHoaDonNVPV"
        component={ChiTietHoaDonNVPV}
        options={{headerShown: false}}
      />
      <KhuVucStack.Screen
        name="ThemMonNVPV"
        component={ThemMonNVPV}
        options={{headerShown: false}}
      />
    </KhuVucStack.Navigator>
  );
};

export default KhuVucStackScreen;