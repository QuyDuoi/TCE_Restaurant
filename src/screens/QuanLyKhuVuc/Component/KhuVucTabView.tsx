import {View, Text, useWindowDimensions, ScrollView} from 'react-native';
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
import {fetchKhuVucs, KhuVuc} from '../../../store/KhuVucSlice';
import {Ban, fetchBans} from '../../../store/BanSlice';
import {RootState} from '../../../store/store';

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
  const idNhaHang = '66fab50fa28ec489c7137537';

  //const [bansByKhuVuc, setBansByKhuVuc] = useState<(Ban & {kv: KhuVuc})[]>([]);
  //const khuVucs = useSelector((state: RootState) => state.khuVuc.khuVucs);
  //const bans = useSelector((state: RootState) => state.ban.bans);

  //update UI
  // const updatedBans = useCallback((updateBan: Ban & {kv: KhuVuc}) => {
  //   // const newBans = bansByKhuVuc.map(ban => {
  //   //   if (ban._id === updateBan._id) {
  //   //     return updateBan;
  //   //   }
  //   //   return ban;
  //   // });
  //   // setBansByKhuVuc(newBans);
  // }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKhuVucs(idNhaHang) as any);
    dispatch(fetchBans() as any);
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchAllBans = async () => {
  //     const allBansPromise = khuVucs.map(kv =>
  //       dispatch(fetchBans(kv._id as string) as any),
  //     );

  //     const allBansResponse = await Promise.all(allBansPromise);
  //     const allBans = allBansResponse.flatMap((response, index) => {
  //       return response.payload.map((ban: Ban) => {
  //         return {
  //           ...ban,
  //           kv: khuVucs[index],
  //         };
  //       });
  //     });

  //     setBansByKhuVuc(allBans);
  //     console.log('render');
  //   };
  //   if (khuVucs.length > 0) {
  //     fetchAllBans();
  //   }
  // }, [khuVucs, dispatch]);

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
