import React, { useLayoutEffect, useState } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from '../screens/QuanLyThucDon/TabView';
import ManThemMonAn from '../screens/QuanLyThucDon/themMonAn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ButtonComponent from '../screens/QuanLyThucDon/Hoa/components/ButtonComponent';
import { colors } from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import ProductDetailScreen from '../screens/QuanLyThucDon/xemCTMonAn';

const ThucDonStack = createNativeStackNavigator();

function ThucDonStackScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [dialogSettingHandler, setDialogSettingHandler] = useState<
    null | (() => void)
  >(null);
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'TabsThucDon';
    if (routeName === 'TabsThucDon') {
      navigation.setOptions({
        headerShown: true,
        headerRight: () => (
          <ButtonComponent
            title="Thiết lập"
            titleSize={14}
            titleColor={colors.price}
            onPress={() => {
              if (dialogSettingHandler) {
                dialogSettingHandler();
              }
            }}
            styles={{
              paddingHorizontal: 8,
              marginRight: 10,
            }}
          />
        ),
      });
    } else if (routeName === 'ProductDetailScreen') {
      navigation.setOptions({headerShown: false});
    }
  }, [navigation, route, dialogSettingHandler]);

  return (
    <ThucDonStack.Navigator>
      <ThucDonStack.Screen
        name="TabsThucDon"
        options={{
          headerShown: false,
        }}>
        {props => (
          <MyTabs
            {...props}
            setDialogSettingHandler={setDialogSettingHandler}
          />
        )}
      </ThucDonStack.Screen>
      <ThucDonStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{headerShown: true}}
      />
      <ThucDonStack.Screen
        name="ThemMonAn"
        component={ManThemMonAn}
        options={{headerShown: true}}
      />
    </ThucDonStack.Navigator>
  );
}

export default ThucDonStackScreen;
