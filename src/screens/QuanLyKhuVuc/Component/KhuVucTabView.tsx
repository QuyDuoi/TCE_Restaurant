import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {hoaStyles} from '../../QuanLyThucDon/Hoa/styles/hoaStyles';
import {
  SceneMap,
  TabBar,
  TabBarItem,
  TabBarProps,
  TabView,
} from 'react-native-tab-view';
import KhongGianComponent from '../KhongGianComponent';
import ThongTinKhuVuc from '../ThongTinKhuVuc';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import InputComponent from '../../QuanLyThucDon/Hoa/components/InputComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {fetchKhuVucs, KhuVuc} from '../../../store/Slices/KhuVucSlice';
import {Ban, fetchBans} from '../../../store/Slices/BanSlice';
import {RootState} from '../../../store/store';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';

interface Route {
  key: string;
  title: string;
}

interface State {
  index: number;
  routes: Route[];
  searchQueryBan: string;
  searchQueryKhuVuc: string;
}

const KhongGianRoute = ({searchQueryBan}: {searchQueryBan: string}) => (
  <View>{<KhongGianComponent searchQueryBan={searchQueryBan} />}</View>
);

const ThongTinKhuVucRoute = ({
  searchQueryKhuVuc,
}: {
  searchQueryKhuVuc: string;
}) => <View>{<ThongTinKhuVuc searchQueryKhuVuc={searchQueryKhuVuc} />}</View>;

const KhuVucTabView = () => {
  const idNhaHang = '66fab50fa28ec489c7137537';
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const khuVucStatus = useSelector((state: RootState) => state.khuVuc.status);

  useEffect(() => {
    if (khuVucStatus === 'idle') {
      setIsLoading(true);
      dispatch(fetchKhuVucs(idNhaHang) as any);
      dispatch(fetchBans() as any);
    } else if (khuVucStatus === 'succeeded') {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else if (khuVucStatus === 'failed') {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [dispatch, khuVucStatus]);

  const layout = useWindowDimensions();

  const [tabState, setTabState] = useState<State>({
    index: 0,
    routes: [
      {key: 'khongGian', title: 'Không Gian'},
      {key: 'thongTinKhuVuc', title: 'Thông Tin Khu Vực'},
    ],
    searchQueryBan: '',
    searchQueryKhuVuc: '',
  });

  const renderSceneArea = ({route}: {route: Route}) => {
    switch (route.key) {
      case 'khongGian':
        return <KhongGianRoute searchQueryBan={tabState.searchQueryBan} />;
      case 'thongTinKhuVuc':
        return (
          <ThongTinKhuVucRoute searchQueryKhuVuc={tabState.searchQueryKhuVuc} />
        );
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
        value={
          tabState.index === 0
            ? tabState.searchQueryBan
            : tabState.searchQueryKhuVuc
        }
        onChangeText={searchQueryBan =>
          setTabState(prevState => ({
            ...prevState,
            [tabState.index === 0 ? 'searchQueryBan' : 'searchQueryKhuVuc']:
              searchQueryBan,
          }))
        }
        placeholder="Tìm Kiếm"
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
        bgrColor={colors.white}
      />
      <SpaceComponent height={10} />
      <TabView
        navigationState={tabState}
        renderScene={
          isLoading
            ? () => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" />
                </View>
              )
            : renderSceneArea
        }
        renderTabBar={renderTabBarArea}
        onIndexChange={index => setTabState({...tabState, index})}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

export default KhuVucTabView;
