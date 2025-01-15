import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import ItemTrangThaiBan from './Component/ItemTrangThaiBan';
import SectionComponent from '../QuanLyThucDon/Hoa/components/SectionComponent';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import ModalChucNang from './ComponentModal/ModalChucNang';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {KhuVuc} from '../../store/Slices/KhuVucSlice';
import {Ban} from '../../store/Slices/BanSlice';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import {searchBan} from '../../services/api';
import debounce from 'lodash';
import ItemBanSearch from './Component/ItemBanSearch';
import {UserLogin} from '../../navigation/CustomDrawer';
import io from 'socket.io-client';
import {fetchKhuVucVaBan} from '../../store/Thunks/khuVucThunks';
import ModalDanhSachOrderBan from './ComponentModal/ModalDanhSachOrderBan';
import {useToast} from '../../customcomponent/CustomToast';
import notifee, {AndroidImportance} from '@notifee/react-native';

interface Props {
  searchQueryBan: string;
}

const KhongGianComponent = (props: Props) => {
  const {searchQueryBan} = props;

  const [isVisibleDialog, setIsVisibleDialog] = useState(false);
  const [selectedBan, setSelectedBan] = useState<(Ban & {kv: KhuVuc}) | null>(
    null,
  );
  const [isVisibleDanhSachOrderModal, setIsVisibleDanhSachOrderModal] =
    useState(false);
  const [bansSearch, setBansSearch] = useState<Ban[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bans = useSelector((state: RootState) => state.ban.bans);
  const khuvucs = useSelector((state: RootState) => state.khuVuc.khuVucs);
  const user: UserLogin = useSelector(state => state.user);
  const caLams = useSelector((state: RootState) => state.caLam.caLams);

  const [trangThaiCa, setTrangThaiCa] = useState(false); // State để theo dõi trạng thái ca làm

  const id_nhaHang = user?.id_nhaHang?._id;

  const {showToast} = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearchQueryBan = useRef(
    debounce.debounce(async (text: string) => {
      if (text.trim().length > 0) {
        setIsLoading(true);
        try {
          const data = await searchBan(text);
          setBansSearch(data as any);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setBansSearch([]);
      }
    }, 1500),
  );

  useEffect(() => {
    if (searchQueryBan.trim().length > 0) {
      setIsLoading(true);
    }
    debouncedSearchQueryBan.current(searchQueryBan);
    if (searchQueryBan.trim().length === 0) {
      setIsLoading(false);
    }

    return () => {
      debouncedSearchQueryBan.current.cancel();
    };
  }, [searchQueryBan]);

  useEffect(() => {
    // Kiểm tra lại các ca làm có trường ketThuc là null
    const checkCaLam = caLams.filter(caLam => caLam.ketThuc == null);
    if (checkCaLam.length > 0) {
      setTrangThaiCa(false); // Có ca làm chưa kết thúc, nên hiển thị giao diện bình thường
    } else {
      setTrangThaiCa(true); // Không có ca làm chưa kết thúc, nên hiển thị thông báo
    }
  }, [caLams]); // Lắng nghe sự thay đổi của caLams

  // Kết nối socket.io
  useEffect(() => {
    const socket = io('https://tce-restaurant-api.onrender.com');

    socket.on('themHoaDon', () => {
      dispatch(fetchKhuVucVaBan(id_nhaHang) as any);
    });

    socket.on('capNhatBan', () => {
      dispatch(fetchKhuVucVaBan(id_nhaHang) as any);
    });

    socket.on('dongCaLam', () => {
      dispatch(fetchKhuVucVaBan(id_nhaHang) as any);
    });

    socket.on('khachOrder', data => {
      onDisplayNotify(data);
      dispatch(fetchKhuVucVaBan(id_nhaHang) as any);
    });

    // Cleanup khi component unmount
    return () => {
      socket.disconnect();
    };
  }, [dispatch, id_nhaHang]);

  // Notify
  const onDisplayNotify = async (data: any) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'Order',
      name: 'Order Notification',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: `Thông báo đặt món`,
      body: `${data.msg}!`,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
  };
  // End notify

  const banTrong = bans.filter(ban => ban.trangThai === 'Trống');
  const banDaDat = bans.filter(ban => ban.trangThai === 'Đã đặt');
  const banDangSuDung = bans.filter(ban => ban.trangThai === 'Đang sử dụng');
  const banDangChoXacNhan = bans.filter(ban => ban.trangThaiOrder === true);

  const getImageBan = (status: string) => {
    switch (status) {
      case 'Trống':
        return require('../../image/bantrong.png');
      case 'Đang sử dụng':
        return require('../../image/bansudung.png');
      case 'Đã đặt':
        return require('../../image/bandat.png');
      default:
        return require('../../image/bantrong.png'); // Fallback image
    }
  };

  const handleSelectBan = useCallback(
    (ban: Ban) => {
      if (user.vaiTro === 'Đầu bếp') {
        return;
      }
      const idKhuVuc =
        typeof ban.id_khuVuc === 'string' ? ban.id_khuVuc : ban.id_khuVuc._id;
      const kv = khuvucs.find(kv => kv._id === idKhuVuc);
      setSelectedBan({...ban, kv: kv as KhuVuc});

      setIsVisibleDialog(true);
    },
    [user.vaiTro, khuvucs],
  );

  const handleSelectBanDangOrder = useCallback(
    (ban: Ban) => {
      if (user.vaiTro === 'Đầu bếp') {
        return;
      }
      const idKhuVuc =
        typeof ban.id_khuVuc === 'string' ? ban.id_khuVuc : ban.id_khuVuc._id;
      const kv = khuvucs.find(kv => kv._id === idKhuVuc);
      setSelectedBan({...ban, kv: kv as KhuVuc});

      setIsVisibleDanhSachOrderModal(true);
    },
    [user.vaiTro, khuvucs],
  );

  const renderItemSearch = ({item}: {item: Ban}) => {
    const banKhuVuc = khuvucs?.find(kv => kv._id === (item.id_khuVuc as any));

    return (
      <ItemBanSearch
        tenBan={item.tenBan}
        tenKhuVuc={banKhuVuc?.tenKhuVuc ?? ''}
        trangThai={item.trangThai}
        image={getImageBan(item.trangThai)}
        onLongPress={() => {
          handleSelectBan(item);
        }}
      />
    );
  };

  const renderItem = ({item}: {item: Ban & {kv: KhuVuc}}) => {
    const banKhuVuc = khuvucs?.find(kv => kv._id === (item.id_khuVuc as any));

    return (
      <ItemTrangThaiBan
        nameBan={item.tenBan}
        nameKhuVuc={banKhuVuc?.tenKhuVuc || ''}
        image={getImageBan(item.trangThai)}
        onPress={() => {
          handleSelectBan(item);
        }}
      />
    );
  };

  const renderItemBanDangOrder = ({item}: {item: Ban & {kv: KhuVuc}}) => {
    const banKhuVuc = khuvucs?.find(kv => kv._id === (item.id_khuVuc as any));

    return (
      <ItemTrangThaiBan
        nameBan={item.tenBan}
        nameKhuVuc={banKhuVuc?.tenKhuVuc || ''}
        image={getImageBan(item.trangThai)}
        onPress={() => {
          handleSelectBanDangOrder(item);
        }}
      />
    );
  };

  const renderHeader = () => {
    // Optional: Add a header if needed
    return null;
  };

  // Synchronize selectedBan with updated Redux state
  useEffect(() => {
    if (selectedBan) {
      const updatedBan = bans.find(ban => ban._id === selectedBan._id);
      if (updatedBan) {
        const idKhuVuc =
          typeof updatedBan.id_khuVuc === 'string'
            ? updatedBan.id_khuVuc
            : updatedBan.id_khuVuc._id;
        const updatedKhuVuc = khuvucs.find(kv => kv._id === idKhuVuc);
        setSelectedBan({...updatedBan, kv: updatedKhuVuc as KhuVuc});
      } else {
        // If the selectedBan no longer exists, deselect it
        setSelectedBan(null);
        setIsVisibleDialog(false);
        setIsVisibleDanhSachOrderModal(false);
      }
    }
  }, [bans, khuvucs]);

  const handleCloseModal = () => {
    setIsVisibleDialog(false);
    setSelectedBan(null);
  };

  return (
    <>
      {isLoading ? (
        // Hiển thị ActivityIndicator khi đang tải dữ liệu
        <View
          style={[
            hoaStyles.containerTopping,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator size="large" />
        </View>
      ) : trangThaiCa ? (
        // Nếu chưa có ca làm nào được mở, hiển thị thông báo
        <View
          style={[
            hoaStyles.containerTopping,
            {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <TitleComponent
            text="Chưa có ca làm nào được mở"
            color={colors.desc}
            styles={[styles.textMessage, {}]}
          />
        </View>
      ) : bans.length > 0 && searchQueryBan.trim().length === 0 ? (
        // Nếu có ca làm đang mở và không tìm kiếm, hiển thị danh sách bàn
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={[
            hoaStyles.containerTopping,
            {
              backgroundColor: '#F7FAFC',
            },
          ]}>
          <View>
            {/* Bàn Trống */}
            <SectionComponent
              styles={{
                height: banTrong.length > 0 ? undefined : '20%',
              }}>
              <TitleComponent text="Bàn trống" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
                {banTrong.length > 0 ? (
                  <FlatList
                    data={banTrong as any}
                    renderItem={renderItem}
                    keyExtractor={item => item._id as any}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <TextComponent
                    text="Không có bàn nào trống"
                    color={colors.desc}
                    styles={styles.textMessage}
                  />
                )}
              </View>
            </SectionComponent>

            {/* Bàn Đang Sử Dụng */}
            <SectionComponent
              styles={{
                height: banDangSuDung.length > 0 ? undefined : '20%',
              }}>
              <TitleComponent text="Bàn đang sử dụng" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
                {banDangSuDung.length > 0 ? (
                  <FlatList
                    data={banDangSuDung as any}
                    renderItem={renderItem}
                    keyExtractor={item => item._id as any}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <TextComponent
                    text="Không có bàn nào được sử dụng"
                    color={colors.desc}
                    styles={styles.textMessage}
                  />
                )}
              </View>
            </SectionComponent>

            {/* Bàn Đã Đặt */}
            <SectionComponent
              styles={{
                height: banDaDat.length > 0 ? undefined : '15%',
              }}>
              <TitleComponent text="Bàn đã đặt" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
                {banDaDat.length > 0 ? (
                  <FlatList
                    data={banDaDat as any}
                    renderItem={renderItem}
                    keyExtractor={item => item._id as any}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <TextComponent
                    text="Không có bàn nào được đặt"
                    color={colors.desc}
                    styles={styles.textMessage}
                  />
                )}
              </View>
            </SectionComponent>

            {/* Bàn Đang Chờ Xác Nhận */}
            <SectionComponent
              styles={{
                height: banDangChoXacNhan.length > 0 ? undefined : '15%',
              }}>
              <TitleComponent text="Bàn đang chờ xác nhận" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
                {banDangChoXacNhan.length > 0 ? (
                  <FlatList
                    data={banDangChoXacNhan as any}
                    keyExtractor={item => item._id as string}
                    renderItem={renderItemBanDangOrder}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <TextComponent
                    text="Không có bàn nào đang chờ xác nhận"
                    color={colors.desc}
                    styles={[styles.textMessage]}
                  />
                )}
              </View>
            </SectionComponent>
          </View>
          <SpaceComponent height={30} />
        </ScrollView>
      ) : searchQueryBan.trim().length > 0 && bansSearch.length > 0 ? (
        // Nếu đang tìm kiếm và có kết quả tìm kiếm
        <View style={[hoaStyles.containerTopping]}>
          <FlatList
            data={bansSearch as any}
            renderItem={renderItemSearch}
            keyExtractor={item => item._id as any}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <SpaceComponent height={10} />}
          />
        </View>
      ) : (
        // Nếu đang tìm kiếm nhưng không có kết quả
        bansSearch.length === 0 &&
        searchQueryBan.trim().length > 0 && (
          <View
            style={[
              hoaStyles.containerTopping,
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <TitleComponent
              text="Chưa có bàn được tạo"
              color={colors.desc}
              styles={[styles.textMessage, {}]}
            />
          </View>
        )
      )}
      {/* Các Modal */}
      <ModalChucNang
        isVisible={isVisibleDialog}
        onClose={handleCloseModal}
        onCloseParent={handleCloseModal}
        selectedBan={selectedBan}
      />
      <ModalDanhSachOrderBan
        visible={isVisibleDanhSachOrderModal}
        onClose={() => {
          setIsVisibleDanhSachOrderModal(false);
          setSelectedBan(null);
        }}
        selectedBan={selectedBan}
        danhSachOrder={selectedBan?.danhSachOrder}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textMessage: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  button: {
    height: 45,
  },
});

export default React.memo(KhongGianComponent);
