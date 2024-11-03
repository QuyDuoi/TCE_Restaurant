/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import App from './App';
import ThongKeDoanhThu from './src/screens/ThongKe/ThongKeDoanhThu';
import ThongKeTop5MonAn from './src/screens/ThongKe/ThongKeTop5MonAn';
import ThongKeNguonDoanhThu from './src/screens/ThongKe/ThongKeNguonDoanhThu';

AppRegistry.registerComponent(appName, () => App);
