import * as React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar, TabBarProps} from 'react-native-tab-view';

// Định nghĩa kiểu cho các route của TabView
interface Route {
  key: string;
  title: string;
}

// Định nghĩa kiểu cho state của TabView
interface State {
  index: number;
  routes: Route[];
}

// Tạo các Scene (giao diện của các Tab)
const MonRoute = () => (
  <View style={styles.scene}>
    <Text>Bữa chính và danh sách món ăn</Text>
    {/* Danh sách các món ăn sẽ hiển thị ở đây */}
  </View>
);

const NhomToppingRoute = () => (
  <View style={styles.scene}>
    <Text>Danh sách nhóm Topping</Text>
    {/* Danh sách topping sẽ hiển thị ở đây */}
  </View>
);

// Thành phần chính của TabView
export default function MyTabs() {
  const layout = useWindowDimensions();

  const [state, setState] = React.useState<State>({
    index: 0,
    routes: [
      {key: 'mon', title: 'Món'},
      {key: 'nhomTopping', title: 'Nhóm Topping'},
    ],
  });

  const renderScene = SceneMap({
    mon: MonRoute,
    nhomTopping: NhomToppingRoute,
  });

  // renderTabBar được định nghĩa với kiểu dữ liệu TabBarProps
  const renderTabBar = (props: TabBarProps<Route>) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'blue'}}
      style={{backgroundColor: 'white'}}
      renderLabel={({route, focused, color}) => (
        <Text style={{color: focused ? 'blue' : 'gray', margin: 8}}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={state}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={index => setState(prevState => ({...prevState, index}))}
      initialLayout={{width: layout.width}}
      style={styles.container}
    />
  );
}

// Các kiểu style cho component
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
