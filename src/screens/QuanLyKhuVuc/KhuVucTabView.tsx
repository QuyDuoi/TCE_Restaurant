import {View, Text, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import {
  SceneMap,
  TabBar,
  TabBarItem,
  TabBarProps,
  TabView,
} from 'react-native-tab-view';
import KhongGianComponent from './KhongGianComponent';
import ThongTinKhuVuc from './ThongTinKhuVuc';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import InputComponent from '../QuanLyThucDon/Hoa/components/InputComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Route {
  key: string;
  title: string;
}

interface State {
  index: number;
  routes: Route[];
  searchQuery: string;
}

const KhongGianRoute = ({searchQuery}: {searchQuery: string}) => (
  <View>{<KhongGianComponent searchQuery={searchQuery} />}</View>
);

const ThongTinKhuVucRoute = ({searchQuery}: {searchQuery: string}) => (
  <View>{<ThongTinKhuVuc searchQuery={searchQuery} />}</View>
);

const KhuVucTabView = () => {
  const layout = useWindowDimensions();

  const [tabState, setTabState] = useState<State>({
    index: 0,
    routes: [
      {key: 'khongGian', title: 'Không Gian'},
      {key: 'thongTinKhuVuc', title: 'Thông Tin Khu Vực'},
    ],
    searchQuery: '',
  });

  const renderSceneArea = ({route}: {route: Route}) => {
    switch (route.key) {
      case 'khongGian':
        return <KhongGianRoute searchQuery={tabState.searchQuery} />;
      case 'thongTinKhuVuc':
        return <ThongTinKhuVucRoute searchQuery={tabState.searchQuery} />;
      default:
        return null;
    }
  };

  const renderTabBarArea = (props: TabBarProps<Route>) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'blue'}}
      style={{backgroundColor: colors.white}}
      renderLabel={({route, focused, color}) => (
        <Text style={{color: focused ? 'blue' : colors.gray, margin: 8}}>
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
        value={tabState.searchQuery}
        onChangeText={searchQuery => setTabState({...tabState, searchQuery})}
        placeholder="Tim Kiem"
        styles={{
          backgroundColor: colors.search,
        }}
        leftIcon={
          <Icon
            name="search"
            size={17}
            color={colors.desc}
            style={{
              alignSelf: 'center',
              marginLeft: 10,
            }}
          />
        }
        allowClear
        styleIconX={{
          alignSelf: 'center',
          paddingRight: 8,
        }}
      />
      <TabView
        navigationState={tabState}
        renderScene={renderSceneArea}
        renderTabBar={renderTabBarArea}
        onIndexChange={index => setTabState({...tabState, index})}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

export default KhuVucTabView;
