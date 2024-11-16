import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import MyTabs from './src/screens/QuanLyThucDon/TabView';
import DanhMucComponent from './src/screens/QuanLyThucDon/Hoa/components/DanhMucComponent';
import NhomToppingComponent from './src/screens/QuanLyThucDon/Hoa/components/NhomToppingComponent';
import NhanVienComponent from './src/screens/QuanLyNhanVien/NhanVienComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddEmployeeScreen from './src/screens/QuanLyNhanVien/themNhanVien'; // Màn hình thêm nhân viên
import ItemNhanVien from './src/screens/QuanLyNhanVien/ItemNhanVien';
import EditEmployeeInfo from './src/screens/QuanLyNhanVien/EditEmployeeInfo';
import EmployeeDetails from './src/screens/QuanLyNhanVien/EmployeeDetails';
import KhuVucTabView from './src/screens/QuanLyKhuVuc/Component/KhuVucTabView';
import QuanLyCaLam from './src/screens/QuanLyThucDon/Hoa/caLam/QuanLyCaLam';
import ProductDetailScreen from './src/screens/QuanLyThucDon/xemCTMonAn';
import ManThemMonAn from './src/screens/QuanLyThucDon/themMonAn';
import LoginScreen from './src/screens/Authentication/LoginScreen';
import auth from '@react-native-firebase/auth';
import CategoryScreen from './src/screens/QuanLyThucDon/CategoryScreen';
import Detail from './src/screens/Authentication/Detail';
import DashBoard from './src/screens/Authentication/DashBoard';
import FoodOrderScreen from './src/screens/QuanLyLenMon/FoodOderScreen';
import BillScreen from './src/screens/QuyetToanHoaDon/BillScreen';
import BookingFlow from './src/customcomponent/BookingFlow';
import TableBookingDetail from './src/customcomponent/ItemChiTietDatBan';
import ChiTietHoaDonNVPV from './src/screens/QuanLyKhuVuc/taoHoaDon/ChiTietHoaDonNVPV';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <DrawerNavigator />
      </View>
    </Provider>
  );
}

// function App(): React.JSX.Element {
//   // Khai báo trạng thái
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();
//   // Hàm xử lý thay đổi trạng thái người dùng
//   function onAuthStateChanged(user: any) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }
//   // Sử dụng useEffect để theo dõi thay đổi trạng thái xác thực
//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (!user) {
//     return (
//       <Provider store={store}>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Login">
//             <Stack.Screen
//               name="Login"
//               component={LoginScreen}
//               options={{headerShown: false}}
//             />
//             <Stack.Screen
//               name="Detail"
//               component={Detail}
//               options={{headerShown: false}}
//             />
//             <Stack.Screen
//               name="Dashboard"
//               component={DashBoard}
//               options={{headerShown: false}}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </Provider>
//     );
//   }
//   return (
//     <Provider store={store}>
//       <Text>Welcome: {user.uid}</Text>

//       <View style={{flex: 1}}>
//         <Detail user={user} />
//       </View>
//     </Provider>
//   );
// }

export default App;
