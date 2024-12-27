import * as React from 'react';
import {View, useWindowDimensions, Text, TextInput} from 'react-native';
import {TabView, TabBar, TabBarProps, TabBarItem} from 'react-native-tab-view';

import DanhMucComponent from './DanhMucComponent';
import NhomToppingComponent from './Hoa/components/NhomToppingComponent';
import {hoaStyles} from './Hoa/styles/hoaStyles';
import SettingModaDanhMuc from '../QuanLyCaLam/SettingModaDanhMuc';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpaceComponent from './Hoa/components/SpaceComponent';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDanhMucVaMonAn} from '../../store/Thunks/danhMucThunks';
import {AppDispatch, RootState} from '../../store/store';
import {UserLogin} from '../../navigation/CustomDrawer';
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
  const user: UserLogin = useSelector(state => state.user);

  const [visible, setVisible] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const id_nhaHang = user?.id_nhaHang?._id;

  const monAns = useSelector((state: RootState) => state.monAn.monAns);

  const [state, setState] = React.useState<State>({
    index: 0,
    routes: [
      {key: 'mon', title: 'Món'},
      {key: 'nhomTopping', title: 'Nhóm Topping'},
    ],
    searchQueryMonAn: '',
    searchQueryNhomTopping: '',
  });

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (monAns.length === 0) {
  //       dispatch(fetchDanhMucVaMonAn(id_nhaHang));
  //       console.log('Goi du lieu');
  //     }
  //   }, []),
  // );

  React.useEffect(() => {
    if (monAns.length === 0) {
      dispatch(fetchDanhMucVaMonAn(id_nhaHang));
      console.log('Goi du lieu');
    }
  }, []);

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F1F2FC',
            marginHorizontal: 10,
            borderRadius: 10,
            borderWidth: isFocused ? 1 : 0, // Thay đổi border khi focus
            borderColor: isFocused ? '#9E81C3' : '#ccc', // Màu sắc border khi focus
            elevation: 10,
            marginVertical: 4,
          }}>
          <Icon
            name="search"
            size={18}
            color={'black'}
            style={{paddingHorizontal: 15}}
          />
          <TextInput
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
            placeholder="Tìm Kiếm "
            style={{width: '85%', fontSize: 15}}
            onFocus={() => setIsFocused(true)} // Cập nhật trạng thái khi focus
            onBlur={() => setIsFocused(false)} // Cập nhật trạng thái khi blur
          />
        </View>
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
      <SettingModaDanhMuc
        visible={visible}
        onClose={handleCloseModal}
        navigation={props.navigation}
      />
    </>
  );
}
