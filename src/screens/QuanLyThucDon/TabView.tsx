import * as React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';

import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarProps,
  TabBarItem,
} from 'react-native-tab-view';

import DanhMucComponent from './Hoa/components/DanhMucComponent';
import NhomToppingComponent from './Hoa/components/NhomToppingComponent';
import InputComponent from './Hoa/components/InputComponent';
import {hoaStyles} from './Hoa/styles/hoaStyles';
import TextComponent from './Hoa/components/TextComponent';
import SpaceComponent from './Hoa/components/SpaceComponent';
import {colors} from './Hoa/contants/hoaColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import KhongGianComponent from '../KhuVuc/Hoa/KhongGianComponent';
import ThongTinKhuVuc from '../KhuVuc/Hoa/ThongTinKhuVuc';

// Định nghĩa kiểu cho các route của TabView
interface Route {
  key: string;
  title: string;
}

// Định nghĩa kiểu cho state của TabView
interface State {
  index: number;
  routes: Route[];
  searchQuery: string;
}

// Tạo các Scene (giao diện của các Tab)
const MonRoute = () => (
  <View style={hoaStyles.tabViewScene}>{<DanhMucComponent />}</View>
);

const NhomToppingRoute = ({searchQuery}: {searchQuery: string}) => (
  <View style={hoaStyles.tabViewScene}>
    {<NhomToppingComponent searchQuery={searchQuery} />}
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
    searchQuery: '',
  });

  const renderScene = SceneMap({
    mon: MonRoute,
    nhomTopping: () => <NhomToppingRoute searchQuery={state.searchQuery} />,
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
      renderTabBarItem={({key, ...restProps}) => (
        <TabBarItem key={key} {...restProps} />
      )}
    />
  );

  return (
    <View style={[hoaStyles.tabViewContainer]}>
      <InputComponent
        value={state.searchQuery}
        onChangeText={val =>
          setState(prevState => ({...prevState, searchQuery: val}))
        }
        placeholder="Tìm kiếm"
        styles={{
          backgroundColor: colors.search,
        }}
        leftIcon={
          <Icon
            name="search"
            size={17}
            color={colors.desc}
            style={{alignSelf: 'center', paddingLeft: 5}}
          />
        }
        allowClear
        styleIconX={{alignSelf: 'center', paddingRight: 8}}
      />
      <TabView
        navigationState={state}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={index => setState(prevState => ({...prevState, index}))}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
}
