import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import MyTabs from './src/screens/QuanLyThucDon/TabView';
import DanhMucComponent from './src/screens/QuanLyThucDon/Hoa/components/DanhMucComponent';
import NhomToppingComponent from './src/screens/QuanLyThucDon/Hoa/components/NhomToppingComponent';
import NhanVienComponent from './src/screens/QuanLyNhanVien/Hoa/NhanVienComponent';
import KhongGianComponent from './src/screens/KhuVuc/Hoa/KhongGianComponent';
import ThongTinKhuVuc from './src/screens/KhuVuc/Hoa/ThongTinKhuVuc';
import KhuVucTabView from './src/screens/KhuVuc/Hoa/KhuVucTabView';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <KhuVucTabView />
      </View>
    </Provider>
  );
}

export default App;
