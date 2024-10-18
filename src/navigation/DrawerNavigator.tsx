import React, {useLayoutEffect} from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from '../../App';
import QuanLyCaLam from '../screens/QuanLyThucDon/Hoa/caLam/QuanLyCaLam';
import ChiTietCaLam from '../screens/QuanLyThucDon/Hoa/caLam/ChiTietCaLam';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Drawer = createDrawerNavigator();
const CaLamStack = createNativeStackNavigator();

function CaLamStackScreen({navigation, route}: {navigation: any; route: any}) {
  //an hien header drawer
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'QuanLyCaLam';
    if (routeName === 'ChiTietCaLam') {
      navigation.setOptions({headerShown: false});
    } else {
      navigation.setOptions({headerShown: true});
    }
  });

  return (
    <CaLamStack.Navigator>
      <CaLamStack.Screen
        name="QuanLyCaLam"
        component={QuanLyCaLam}
        options={{headerShown: false}}
      />
      <CaLamStack.Screen
        name="ChiTietCaLam"
        component={ChiTietCaLam}
        options={{}}
      />
    </CaLamStack.Navigator>
  );
}

function DrawerNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="CaLam">
        <Drawer.Screen
          name="Home"
          component={App}
          options={{title: 'Quản lý thực đơn'}}
        />
        <Drawer.Screen
          name="CaLam"
          component={CaLamStackScreen}
          options={{title: 'Quản lý ca'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
