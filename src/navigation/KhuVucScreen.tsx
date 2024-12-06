import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useLayoutEffect, useState} from 'react';
import KhuVucTabView from '../screens/QuanLyKhuVuc/Component/KhuVucTabView';
import ChiTietHoaDonNVPV from '../screens/QuanLyKhuVuc/taoHoaDon/ChiTietHoaDonNVPV';
import ThemMonNVPV from '../screens/QuanLyKhuVuc/taoHoaDon/ThemMonNVPV';
import {Text, TouchableOpacity} from 'react-native';
import DatLichHen from '../screens/QuanLyKhuVuc/DatLichHen';

const KhuVucStack = createNativeStackNavigator();

const KhuVucStackScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [modalLuaChon, setModalLuaChon] = useState(false);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'KhuVucTabView';
    if (routeName === 'KhuVucTabView') {
      navigation.setOptions({
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            style={{
              borderColor: 'orange',
              paddingHorizontal: 8,
              marginRight: 10,
              borderWidth: 1,
              paddingVertical: 6,
              borderRadius: 6,
            }}
            onPress={() => {
              setModalLuaChon(true);
            }}>
            <Text style={{color: 'orange', fontWeight: 'bold', fontSize: 14}}>
              Tùy chọn
            </Text>
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({headerShown: false});
    }
  }, [navigation, route]);

  return (
    <KhuVucStack.Navigator>
      <KhuVucStack.Screen name="KhuVucTabView" options={{headerShown: false}}>
        {props => (
          <KhuVucTabView
            {...props}
            modalLuaChon={modalLuaChon}
            setModalLuaChon={setModalLuaChon}
          />
        )}
      </KhuVucStack.Screen>
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
      <KhuVucStack.Screen
        name="DatLichHen"
        component={DatLichHen}
        options={{headerShown: false}}
      />
    </KhuVucStack.Navigator>
  );
};

export default KhuVucStackScreen;
