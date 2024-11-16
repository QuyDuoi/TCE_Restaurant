import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {DanhMuc, moveItemDown, moveItemUp} from '../../store/DanhMucSlice';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import ModalThemSuaDanhMuc from './ModalThemSuaDanhMuc';
import AlertDialog from '../../customcomponent/alertDialog';
import ButtonComponent from './Hoa/components/ButtonComponent';
import {colors} from './Hoa/contants/hoaColors';

function CapNhatDanhMuc(): React.JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
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
      <View style={styles.doiViTri}>
        <TouchableOpacity
          onPress={() => {
            dispatch(moveItemUp(item._id || ''));
          }}
          style={{marginRight: 8}}>
          <Icon name="arrow-up" size={20} color={'gray'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            {
              dispatch(moveItemDown(item._id || ''));
            }
          }}>
          <Icon name="arrow-down" size={20} color={'gray'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tieuDe}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="reply" size={30} color="orange" />
          </TouchableOpacity>
          <Text style={styles.title}>Cập nhật danh mục</Text>
        </View>
        <ButtonComponent
          title="Lưu thay đổi"
          titleSize={14}
          titleColor={colors.price}
          onPress={() => {}}
          styles={styles.cuttom}
        />
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
    flexDirection: 'row'
  }
});
