import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {DanhMuc, updateDanhMucOrder} from '../../store/Slices/DanhMucSlice';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import ModalThemSuaDanhMuc from './ModalThemSuaDanhMuc';
import AlertDialog from '../../customcomponent/alertDialog';
import ButtonComponent from './Hoa/components/ButtonComponent';
import {colors} from './Hoa/contants/hoaColors';
import {sapXepDanhMuc} from './CallApiThucDon';
import axios from 'axios';
import { ipAddress } from '../../services/api';

function CapNhatDanhMuc(): React.JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const danhMucs = useSelector((state: RootState) => state.danhMuc.danhMucs);

  const [localDanhMucs, setLocalDanhMucs] = useState<DanhMuc[]>([]);
  const [modalCapNhat, setModalCapNhat] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(true);
  const [danhMucInfo, setDanhMucInfo] = useState<DanhMuc | undefined>(
    undefined,
  );

  // Sync local state with Redux state
  useEffect(() => {
    setLocalDanhMucs(danhMucs);
  }, [danhMucs]);

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const index = localDanhMucs.findIndex(item => item._id === id);
    if (index < 0) return;

    const newDanhMucs = [...localDanhMucs];
    if (direction === 'up' && index > 0) {
      [newDanhMucs[index - 1], newDanhMucs[index]] = [
        newDanhMucs[index],
        newDanhMucs[index - 1],
      ];
    } else if (direction === 'down' && index < newDanhMucs.length - 1) {
      [newDanhMucs[index], newDanhMucs[index + 1]] = [
        newDanhMucs[index + 1],
        newDanhMucs[index],
      ];
    }

    setLocalDanhMucs(newDanhMucs);
  };

  const saveChanges = async () => {
    try {
      const response = await axios.post(`http://192.168.1.6:3000/api/sapXepDanhMuc`, {
        id_nhaHang: '66fab50fa28ec489c7137537', // Đảm bảo bạn thay thế bằng ID thực
        danhMucs: localDanhMucs, // Gửi mảng danh mục với thứ tự đã thay đổi
      });
  
      if (response.status === 200) {
        // Nếu thành công, cập nhật redux
        dispatch(updateDanhMucOrder(localDanhMucs));
      }
    } catch (error) {
      console.log("Lỗi khi sắp xếp: " + error.message);
      
    }
  };

  const renderItem = ({item}: {item: DanhMuc}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setDanhMucInfo(item);
        setModalCapNhat(true);
      }}>
      <Text style={styles.itemText}>{item.tenDanhMuc}</Text>
      <View style={styles.doiViTri}>
        <TouchableOpacity
          onPress={() => moveItem(item._id || '', 'up')}
          style={{marginRight: 8}}>
          <Icon name="arrow-up" size={20} color={'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveItem(item._id || '', 'down')}>
          <Icon name="arrow-down" size={20} color={'gray'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tieuDe}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="reply" size={30} color="orange" />
          </TouchableOpacity>
          <Text style={styles.title}>Cập nhật danh mục</Text>
        </View>
        <ButtonComponent
          title="Lưu thay đổi"
          titleSize={14}
          titleColor={colors.price}
          onPress={saveChanges}
          styles={styles.cuttom}
        />
      </View>
      <View style={styles.containerList}>
        <FlatList
          data={localDanhMucs}
          renderItem={renderItem}
          keyExtractor={item => item._id || ''}
        />
      </View>

      <ModalThemSuaDanhMuc
        visible={modalCapNhat}
        onClose={() => setModalCapNhat(false)}
        idDanhMucUd={danhMucInfo?._id}
        tenDanhMucUd={danhMucInfo?.tenDanhMuc}
        onActionComplete={(success, message) => {
          setAlertSuccess(success);
          setAlertMessage(message);
          setAlertVisible(true);
        }}
      />

      <AlertDialog
        isSuccess={alertSuccess}
        message={alertMessage}
        onDismiss={() => setAlertVisible(false)}
      />
    </View>
  );
}

export default CapNhatDanhMuc;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  doiViTri: {
    flexDirection: 'row',
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
});
