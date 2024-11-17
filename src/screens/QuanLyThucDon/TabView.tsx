import * as React from 'react';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarProps,
  TabBarItem,
} from 'react-native-tab-view';

import DanhMucComponent from './Hoa/components/DanhMucComponent';
import NhomToppingComponent from './Hoa/components/NhomToppingComponent';
import {hoaStyles} from './Hoa/styles/hoaStyles';
import {colors} from './Hoa/contants/hoaColors';
import SettingModaDanhMuc from './Hoa/caLam/SettingModaDanhMuc';
import InputComponent from './Hoa/components/InputComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpaceComponent from './Hoa/components/SpaceComponent';
// Định nghĩa kiểu cho các route của TabView
interface Route {
  key: string;
  title: string;
}

// Định nghĩa kiểu cho state của TabView
interface State {
  index: number;
  routes: Route[];
  searchQueryMonAn: string;
  searchQueryNhomTopping: string;
}

interface Props {
  setDialogSettingHandler: any;
}

// Tạo các Scene (giao diện của các Tab)
const MonRoute = React.memo(
  ({searchQueryMonAn}: {searchQueryMonAn: string}) => (
    <DanhMucComponent searchQueryMonAn={searchQueryMonAn} />
  ),
);
const NhomToppingRoute = React.memo(
  ({searchQueryNhomTopping}: {searchQueryNhomTopping: string}) => (
    <NhomToppingComponent searchQueryNhomTopping={searchQueryNhomTopping} />
  ),
);

// Thành phần chính của TabView
export default function MyTabs(props: Props) {
  const {setDialogSettingHandler} = props;
  const layout = useWindowDimensions();

  const [visible, setVisible] = React.useState(false);

  const [state, setState] = React.useState<State>({
    index: 0,
    routes: [
      {key: 'mon', title: 'Món'},
      {key: 'nhomTopping', title: 'Nhóm Topping'},
    ],
    searchQueryMonAn: '',
    searchQueryNhomTopping: '',
  });

  const renderScene = ({route}: {route: Route}) => {
    switch (route.key) {
      case 'mon':
        return <MonRoute searchQueryMonAn={state.searchQueryMonAn} />;
      case 'nhomTopping':
        return (
          <NhomToppingRoute
            searchQueryNhomTopping={state.searchQueryNhomTopping}
          />
        );
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  React.useEffect(() => {
    if (setDialogSettingHandler) {
      setDialogSettingHandler(() => setVisible.bind(null, true));
    }
  }, [setDialogSettingHandler]);

  // renderTabBar được định nghĩa với kiểu dữ liệu TabBarProps
  const renderTabBar = (props: TabBarProps<Route>) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'blue'}}
      style={{backgroundColor: 'white'}}
      renderLabel={({route, focused}) => (
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
    <>
      <View style={[hoaStyles.tabViewContainer, {}]}>
        <InputComponent
          value={
            state.index === 0
              ? state.searchQueryMonAn
              : state.searchQueryNhomTopping
          }
          onChangeText={searchQuery =>
            setState(prevState => ({
              ...prevState,
              [state.index === 0
                ? 'searchQueryMonAn'
                : 'searchQueryNhomTopping']: searchQuery,
            }))
          }
          placeholder="Tìm kiếm"
          styles={{
            backgroundColor: colors.desc2,
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
        <SpaceComponent height={10} />
        <TabView
          navigationState={state}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={index =>
            setState(prevState => ({...prevState, index}))
          }
          initialLayout={{width: layout.width}}
        />
      </View>
      <SettingModaDanhMuc visible={visible} onClose={handleCloseModal} navigation={props.navigation}/>
    </>
  );
}
