import React, {useEffect, useState} from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/Authentication/LoginScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import moment from 'moment';
import {ActivityIndicator, Text, View} from 'react-native';
import {styles} from './src/navigation/CustomDrawer';
import {ToastProvider} from './src/customcomponent/CustomToast';

const Stack = createStackNavigator();

// function App(): React.JSX.Element {
//   return (
//     <Provider store={store}>
//       <View style={{flex: 1}}>
//           <DeletePostModal/>
//       </View>
//     </Provider>
//   )
// }

function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [thongTin, setThongTin] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const storedUser = await EncryptedStorage.getItem('nhanVien');
      if (storedUser) {
        setThongTin(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Lấy thông tin phiên từ EncryptedStorage
        const session = await EncryptedStorage.getItem('userSession');
        if (session) {
          const {token, expirationTime} = JSON.parse(session);
          // Kiểm tra xem phiên đã hết hạn chưa
          if (moment().isBefore(moment(expirationTime))) {
            // Nếu phiên còn hiệu lực, chuyển đến DrawerNavigator
            setUserInfo({token});
            await fetchUserInfo();
            setInitializing(false);
            return;
          } else {
            // Nếu hết hạn, xóa phiên
            await EncryptedStorage.removeItem('userSession');
          }
        }
      } catch (error) {
        console.log('Error retrieving session:', error);
      } finally {
        setInitializing(false);
      }
    };

    checkSession();
  }, []);

  if (initializing) {
    return (
      <View style={styles.modalOverlay}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <ToastProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName={userInfo ? 'Drawer' : 'Login'}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Drawer" options={{headerShown: false}}>
              {props => <DrawerNavigator {...props} userInfo={thongTin} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
}

export default App;
