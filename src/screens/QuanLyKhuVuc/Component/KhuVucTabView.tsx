import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { hoaStyles } from '../../QuanLyThucDon/Hoa/styles/hoaStyles';
import { TabBar, TabBarItem, TabBarProps, TabView } from 'react-native-tab-view';
import KhongGianComponent from '../KhongGianComponent';
import ThongTinKhuVuc from '../ThongTinKhuVuc';
import { colors } from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import ModalChucNangKhuVuc from '../ComponentModal/ModalChucNangKhuVuc';
import ModalThemSuaKhuVuc from '../ComponentModal/ModalThemSuaKhuVuc';
import ModalThemSuaBan from '../ComponentModal/ModalThemSuaBan';
import { useFocusEffect } from '@react-navigation/native';
import { UserLogin } from '../../../navigation/CustomDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKhuVucVaBan } from '../../../store/Thunks/khuVucThunks';
import { fetchCaLam } from '../../../store/Slices/CaLamSlice';

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

const KhongGianRoute = ({ searchQueryBan }: { searchQueryBan: string }) => (
  <View>{<KhongGianComponent searchQueryBan={searchQueryBan} />}</View>
);

const ThongTinKhuVucRoute = ({
  searchQueryKhuVuc,
}: {
  searchQueryKhuVuc: string;
}) => <View>{<ThongTinKhuVuc searchQueryKhuVuc={searchQueryKhuVuc} />}</View>;

const KhuVucTabView = ({
  modalLuaChon,
  setModalLuaChon,
}: {
  modalLuaChon: boolean;
  setModalLuaChon: (val: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Thêm state để theo dõi lần tải đầu tiên
  const [isFocused, setIsFocused] = useState(false);
  const [isThemKhuVucVisible, setIsThemKhuVucVisible] = useState(false);
  const [isThemBanVisible, setIsThemBanVisible] = useState(false);
  const user: UserLogin = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleThemKhuVuc = () => {
    setIsThemKhuVucVisible(true);
  };

  const handleThemBan = () => {
    setIsThemBanVisible(true);
  };

  const layout = useWindowDimensions();

  const [tabState, setTabState] = useState<State>({
    index: 0,
    routes: [
      { key: 'khongGian', title: 'Không Gian' },
      { key: 'thongTinKhuVuc', title: 'Thông Tin Khu Vực' },
    ],
    searchQueryBan: '',
    searchQueryKhuVuc: '',
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (isFirstLoad) {
          setIsLoading(true); // Chỉ đặt isLoading thành true lần đầu tiên
        }
        const id_nhaHang = user.id_nhaHang._id;
        try {
          await dispatch(fetchKhuVucVaBan(id_nhaHang) as any);
          await dispatch(fetchCaLam(id_nhaHang) as any);
        } catch (error) {
          ToastAndroid.show(
            'Đã xảy ra lỗi khi tải dữ liệu!',
            ToastAndroid.SHORT,
          );
        } finally {
          if (isFirstLoad) {
            setIsLoading(false);
            setIsFirstLoad(false); // Đánh dấu đã tải dữ liệu lần đầu
          }
        }
      };
      fetchData();
    }, [dispatch, user.id_nhaHang._id, isFirstLoad]),
  );

  const renderSceneArea = ({ route }: { route: Route }) => {
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
      indicatorStyle={{ backgroundColor: 'blue' }}
      style={{ backgroundColor: colors.white, borderBottomWidth: 1, borderColor: colors.desc }}
      renderLabel={({ route, focused }) => (
        <Text style={{ color: focused ? 'blue' : 'gray', margin: 8, fontWeight: 'bold' }}>
          {route.title}
        </Text>
      )}
      renderTabBarItem={({ key, ...restProps }) => (
        <TabBarItem key={key} {...restProps} />
      )}
    />
  );

  return (
    <View style={hoaStyles.tabViewContainer}>
      {/* Hiển thị ActivityIndicator chỉ khi đang tải dữ liệu lần đầu */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.orange} />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <>
          {/* Thanh tìm kiếm */}
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
            }}>
            <Icon
              name="search"
              size={18}
              color={'black'}
              style={{ paddingHorizontal: 15 }}
            />
            <TextInput
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
              style={{ width: '85%', fontSize: 15 }}
              onFocus={() => setIsFocused(true)} // Cập nhật trạng thái khi focus
              onBlur={() => setIsFocused(false)} // Cập nhật trạng thái khi blur
            />
          </View>
          <SpaceComponent height={5} />
          {/* TabView hiển thị các tab */}
          <TabView
            navigationState={tabState}
            renderScene={renderSceneArea}
            renderTabBar={renderTabBarArea}
            onIndexChange={index => setTabState({ ...tabState, index })}
            initialLayout={{ width: layout.width }}
          />
          {/* Các Modal */}
          <ModalChucNangKhuVuc
            modalLuaChon={modalLuaChon}
            setModalLuaChon={setModalLuaChon}
            onThemKhuVuc={handleThemKhuVuc}
            onThemBan={handleThemBan}
          />
          <ModalThemSuaKhuVuc
            visible={isThemKhuVucVisible}
            onClose={() => setIsThemKhuVucVisible(false)}
            onActionComplete={(success, message) => {
              if (success) {
                ToastAndroid.show(message, ToastAndroid.SHORT); // Hiển thị thông báo thành công
              } else {
                ToastAndroid.show(message, ToastAndroid.SHORT);
              }
              setIsThemKhuVucVisible(false);
            }}
          />
          <ModalThemSuaBan
            visible={isThemBanVisible}
            onClose={() => setIsThemBanVisible(false)}
            onActionComplete={(success, message) => {
              if (success) {
                ToastAndroid.show(message, ToastAndroid.SHORT); // Hiển thị thông báo thành công
              } else {
                ToastAndroid.show(message, ToastAndroid.SHORT);
              }
              setIsThemBanVisible(false);
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.desc,
  },
});

export default KhuVucTabView;
