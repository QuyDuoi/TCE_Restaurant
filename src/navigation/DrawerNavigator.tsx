import React, {useLayoutEffect, useState} from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from '../../App';
import QuanLyCaLam from '../screens/QuanLyThucDon/Hoa/caLam/QuanLyCaLam';
import ChiTietCaLam from '../screens/QuanLyThucDon/Hoa/caLam/ChiTietCaLam';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import ButtonComponent from '../screens/QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {TabView} from 'react-native-tab-view';
import DanhMucComponent from '../screens/QuanLyThucDon/Hoa/components/DanhMucComponent';
import MyTabs from '../screens/QuanLyThucDon/TabView';
import ProductDetailScreen from '../screens/QuanLyThucDon/xemCTMonAn';

const Drawer = createDrawerNavigator();
const CaLamStack = createNativeStackNavigator();
const ThucDonStack = createNativeStackNavigator();

function CaLamStackScreen({navigation, route}: {navigation: any; route: any}) {
  const [filterHandler, setFilterHandler] = useState<null | (() => void)>(null);

  //an hien header drawer cho chiTietCaLam
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'QuanLyCaLam';
    if (routeName === 'ChiTietCaLam') {
      navigation.setOptions({headerShown: false, swipeEnabled: false});
    } else if (routeName === 'QuanLyCaLam') {
      navigation.setOptions({
        headerShown: true,
        swipeEnabled: true,
        headerRight: () => (
          <ButtonComponent
            title="Lọc"
            onPress={() => {
              //console.log('filterHandler', filterHandler);

              if (filterHandler) {
                filterHandler();
              }
            }}
            bgrColor={colors.blue}
            titleColor={colors.white}
            titleSize={15}
            styles={[
              {
                paddingHorizontal: 20,
                paddingVertical: 3,
                marginRight: 10,
              },
            ]}
            boderRadius={10}
          />
        ),
      });
    }
  }, [navigation, route, filterHandler]);

  return (
    <CaLamStack.Navigator>
      <CaLamStack.Screen name="QuanLyCaLam" options={{headerShown: false}}>
        {props => (
          <QuanLyCaLam {...props} setFilterHandler={setFilterHandler} />
        )}
      </CaLamStack.Screen>
      <CaLamStack.Screen
        name="ChiTietCaLam"
        component={ChiTietCaLam}
        options={{headerShown: false}}
      />
    </CaLamStack.Navigator>
  );
}

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
    </ThucDonStack.Navigator>
  );
}

function DrawerNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ThucDon">
        <Drawer.Screen
          name="ThucDon"
          component={ThucDonStackScreen}
          options={{title: 'Quản lý thực đơn'}}
        />
        <Drawer.Screen
          name="CaLam"
          component={CaLamStackScreen}
          options={{
            title: 'Quản lý ca',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
