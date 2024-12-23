import {View, Text, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import React, {ReactNode, useEffect, useLayoutEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ThucDonStackScreen from './ThucDonScreen';
import BookingFlow from '../customcomponent/BookingFlow';
import {colors} from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserLogin} from './CustomDrawer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {setUser} from '../store/Slices/UserSlice';
import KhongGianComponent from '../screens/QuanLyKhuVuc/KhongGianComponent';
import CaLamStackScreen from './CaLamStackScreen';
import KhuVucStackScreen from './KhuVucScreen';
import ProfileScreen from './ProfileScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FoodOrderScreen from '../screens/QuanLyLenMon/FoodOderScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomTabs = createBottomTabNavigator();

const BottomNavigator = ({userInfo}: any) => {
  const dispath = useDispatch();
  const user = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('UserInfo: ', user);

    if (user === null) {
      setIsLoading(true);
      dispath(setUser(userInfo));
    } else {
      setIsLoading(false);
    }
  }, []);

  return user ? (
    <BottomTabs.Navigator
      initialRouteName={
        user.vaiTro === 'Nhân viên phục vụ' ? 'KhuVuc' : 'LenMon'
      }
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color = focused ? colors.orange : colors.desc;
          switch (route.name) {
            case 'ThucDon':
              icon = <Icon name="cutlery" size={size} color={color} />;
              break;
            case 'KhuVuc':
              icon = <Ionicons name="grid" color={color} size={23} />;
              break;
            case 'Profile':
              icon = <Icon name="user" size={size} color={color} />;
              break;
            case 'LenMon':
              icon = (
                <MaterialIcons name="room-service" color={color} size={23} />
              );
              break;
          }
          return icon;
        },
      })}>
      <BottomTabs.Screen
        name="KhuVuc"
        component={KhuVucStackScreen}
        options={{
          title: 'Khu Vực',
        }}
      />
      <BottomTabs.Screen
        name="ThucDon"
        component={ThucDonStackScreen}
        options={{
          title: 'Thực đơn',
        }}
      />
      <BottomTabs.Screen
        name="LenMon"
        component={FoodOrderScreen}
        options={{
          title: 'Thực đơn',
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Thông tin',
        }}
      />
    </BottomTabs.Navigator>
  ) : (
    <>
      <Modal visible={isLoading} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Đang gửi mã OTP...</Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNavigator;
