import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useLayoutEffect, useState} from 'react';
import ButtonComponent from '../screens/QuanLyThucDon/Hoa/components/ButtonComponent';
import { colors } from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChiTietCaLam from '../screens/QuanLyThucDon/Hoa/caLam/ChiTietCaLam';
import QuanLyCaLam from '../screens/QuanLyThucDon/Hoa/caLam/QuanLyCaLam';
import ChiTietHoaDonScreen from '../screens/QuanLyThucDon/Hoa/caLam/chiTietHoaDon/ChiTietHoaDonScreen';
import ThemMonScreen from '../screens/QuanLyThucDon/Hoa/caLam/chiTietHoaDon/ThemMonScreen';
<<<<<<< HEAD
import InHD from '../screens/inHoaDon/InHoaDon';
import InHoaDon from '../screens/inHoaDon/InHoaDon';
=======
import ThuChiScreen from '../screens/QuanLyThuNhap/ThuChiScreen';
>>>>>>> b5b8ee31a129f1f3e5c8d1243369238e71405b5c

const CaLamStack = createNativeStackNavigator();

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
    } else if (routeName === 'ChiTietHoaDonScreen') {
      navigation.setOptions({headerShown: false});
    } else if (routeName === 'ThemMonScreen') {
      navigation.setOptions({headerShown: false});
    }
      else if (routeName === 'InHoaDon') {
      navigation.setOptions({headerShown: false});
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
      <CaLamStack.Screen
        name="ChiTietHoaDonScreen"
        component={ChiTietHoaDonScreen}
        options={{headerShown: false}}
      />
      <CaLamStack.Screen
        name="ThemMonScreen"
        component={ThemMonScreen}
        options={{headerShown: false}}
      />
      <CaLamStack.Screen
<<<<<<< HEAD
        name="InHoaDon"
        component={InHoaDon}
        options={{headerShown: false}}
=======
      name='ThuChiScreen'
      component={ThuChiScreen}
      options={{headerShown:false}}
>>>>>>> b5b8ee31a129f1f3e5c8d1243369238e71405b5c
      />
    </CaLamStack.Navigator>
  );
}

export default CaLamStackScreen;
