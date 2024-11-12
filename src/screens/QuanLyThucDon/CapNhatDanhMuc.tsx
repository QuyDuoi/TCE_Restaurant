import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {DanhMuc} from '../../store/DanhMucSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import ModalThemSuaDanhMuc from './ModalThemSuaDanhMuc';
import AlertDialog from '../../customcomponent/alertDialog';

function CapNhatDanhMuc(): React.JSX.Element {
  const navigation = useNavigation();
  const danhMucs = useSelector((state: RootState) => state.danhMuc.danhMucs);
  const [modalCapNhat, setModalCapNhat] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(true);
  const [danhMucInfo, setDanhMucInfo] = useState<DanhMuc | undefined>(
    undefined,
  );
  const renderItem = ({item}: {item: DanhMuc}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setDanhMucInfo(item);
        setModalCapNhat(true);
      }}>
      <Text style={styles.itemText}>{item.tenDanhMuc}</Text>
      <Icon name="chevron-right" size={18} color={'gray'} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="reply" size={30} color="orange" />
        </TouchableOpacity>
        <Text style={styles.title}>Cập nhật danh mục</Text>
      </View>
      <View style={styles.containerList}>
        <FlatList
          data={danhMucs}
          renderItem={renderItem}
          keyExtractor={item => item._id || ''}
        />
      </View>

      <ModalThemSuaDanhMuc
        visible={modalCapNhat}
        onClose={() => {
          setModalCapNhat(false);
        }}
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
        onDismiss={() => setAlertVisible(false)} // Thêm chức năng đóng AlertDialog
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
});
