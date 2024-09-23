import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import MyTabs from './src/screens/QuanLyThucDon/TabView';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <MyTabs/>
      </View>
    </Provider>
  );
}

export default App;

