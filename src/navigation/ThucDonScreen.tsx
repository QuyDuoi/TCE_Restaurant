import React, {useEffect, useLayoutEffect, useState} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from '../screens/QuanLyThucDon/TabView';

import ButtonComponent from '../screens/QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import ManCapNhatMonAn from '../screens/QuanLyThucDon/CapNhatMonAn';
import CapNhatDanhMuc from '../screens/QuanLyThucDon/CapNhatDanhMuc';
import ManThemMonAn from '../screens/QuanLyThucDon/ThemMonAn';
import {useSelector} from 'react-redux';
import { UserLogin } from './CustomDrawer';

const ThucDonStack = createNativeStackNavigator();

function ThucDonStackScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const user : UserLogin = useSelector(state => state.user);
  const [dialogSettingHandler, setDialogSettingHandler] = useState<
    null | (() => void)
  >(null);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'TabsThucDon';
    if (routeName === 'TabsThucDon') {
      // Chỉ hiển thị nút Tùy chọn nếu vai trò là 'Quản lý'
      if (user?.vaiTro === 'Quản lý') {
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
        // Nếu vai trò không phải là 'Quản lý', ẩn headerRight
        navigation.setOptions({
          headerShown: true,
          headerRight: () => null, // Không hiển thị nút Tùy chọn
        });
      }
    } else {
      navigation.setOptions({ headerShown: false });
    }
  }, [navigation, route, dialogSettingHandler, user]);

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
