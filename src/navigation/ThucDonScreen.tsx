import React, {useLayoutEffect, useState} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from '../screens/QuanLyThucDon/TabView';

import ButtonComponent from '../screens/QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import ManCapNhatMonAn from '../screens/QuanLyThucDon/CapNhatMonAn';
import CapNhatDanhMuc from '../screens/QuanLyThucDon/CapNhatDanhMuc';
import ManThemMonAn from '../screens/QuanLyThucDon/ThemMonAn';

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
            title="Tùy chọn"
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
              borderWidth: 1,
              paddingVertical: 6,
              borderRadius: 6,
              borderColor: 'orange',
            }}
          />
        ),
      });
    } else {
      navigation.setOptions({headerShown: false});
    }
  }, [navigation, route, dialogSettingHandler]);

  return (
    <ThucDonStack.Navigator>
      <ThucDonStack.Screen name="TabsThucDon" options={{headerShown: false}}>
        {props => (
          <MyTabs
            {...props}
            setDialogSettingHandler={setDialogSettingHandler}
          />
        )}
      </ThucDonStack.Screen>
      <ThucDonStack.Screen
        name="ChiTietMonAn"
        component={ManCapNhatMonAn}
        options={{title: 'Thông tin chi tiết món ăn'}}
      />
      <ThucDonStack.Screen
        name="ThemMonAn"
        component={ManThemMonAn}
        options={{title: 'Thêm món ăn'}}
      />
      <ThucDonStack.Screen
        name="CapNhatDanhMuc"
        component={CapNhatDanhMuc}
        options={{headerShown: false}}
      />
    </ThucDonStack.Navigator>
  );
}

export default ThucDonStackScreen;
