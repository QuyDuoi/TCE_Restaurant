import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import App from '../../App';

const Drawer = createDrawerNavigator();

function DrawerNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={App} options={{title: 'Quản lý thực đơn'}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;

