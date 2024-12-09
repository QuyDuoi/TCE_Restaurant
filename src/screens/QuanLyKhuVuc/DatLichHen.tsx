import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import {fetchDataLichHen} from './CallApiKhuVuc';
import {convertTime} from './utils';
import DatBanModal from './ComponentModal/DatBanModal';

interface LichHen {
  hoTen: string;
  thoiGian: string;
  ghiChu: string;
}

function DatLichHen(): React.JSX.Element {
  const navigation = useNavigation();

  const [lichDatBans, setLichDatBans] = useState([]);
  const [isVisibleDatBan, setIsVisibleDatBan] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const id_nhaHang = '66fab50fa28ec489c7137537';

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const result = await fetchDataLichHen(id_nhaHang); // Gọi hàm fetch từ file khác
        setLichDatBans(result);
      } catch (error) {
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, []);

  const renderItem = ({item}: {item: LichHen}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Tên khách: {item.hoTen}</Text>
      <Text style={styles.itemText}>
        Thời gian đặt: {convertTime(item.thoiGian)}
      </Text>
      <Text style={styles.itemText}>Ghi chú: {item.ghiChu}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tieuDe}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="reply" size={30} color="orange" />
          </TouchableOpacity>
          <Text style={styles.title}>Danh sách đặt bàn</Text>
        </View>
        <ButtonComponent
          title="Tạo lịch hẹn"
          titleSize={14}
          titleColor={colors.price}
          onPress={() => {
            setIsVisibleDatBan(true);
          }}
          styles={styles.cuttom}
        />
      </View>
      <View style={styles.containerList}>
        {lichDatBans.length > 0 ? (
          <FlatList
            data={lichDatBans}
            renderItem={renderItem}
            keyExtractor={item => item._id || ''}
          />
        ) : (
          <Text style={styles.emptyText}>Không có lịch đặt bàn nào!</Text>
        )}
      </View>
      <DatBanModal
        isVisible={isVisibleDatBan}
        onClose={() => setIsVisibleDatBan(false)}
      />
    </View>
  );
}

export default DatLichHen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-between',
  },
  title: {
    marginHorizontal: 20,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 2,
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
  containerList: {
    backgroundColor: '#E8E8E8',
    height: '100%',
    paddingTop: 10,
  },
  cuttom: {
    paddingHorizontal: 8,
    marginRight: 2,
    borderWidth: 1,
    paddingVertical: 6,
    borderRadius: 6,
    borderColor: 'orange',
  },
  tieuDe: {
    flexDirection: 'row',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
    fontWeight: 'bold'
  },
});
