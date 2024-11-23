import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import type {AppDispatch} from '../../store/store';
import {useDispatch} from 'react-redux';
import {
  capNhatDanhMucThunk,
  themDanhMucThunk,
} from '../../store/Thunks/danhMucThunks';
import DanhMuc from '../../services/models/DanhMucModel';

interface DanhMucModalProps {
  visible: boolean;
  onClose: () => void;
  idDanhMucUd?: string;
  tenDanhMucUd?: string;
  onActionComplete: (success: boolean, message: string) => void;
}

function ModalThemSuaDanhMuc(props: DanhMucModalProps): React.JSX.Element {
  const {visible, onClose, idDanhMucUd, tenDanhMucUd, onActionComplete} = props;
  const [tenDanhMuc, setTenDanhMuc] = useState(idDanhMucUd ? tenDanhMucUd : '');
  const [error, setError] = useState<string | null>(null);
  const id_NhaHang = '66fab50fa28ec489c7137537';
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (idDanhMucUd && tenDanhMucUd) {
      setTenDanhMuc(tenDanhMucUd);
    } else {
      setTenDanhMuc('');
    }
  }, [idDanhMucUd, tenDanhMucUd]);

  const luuThongTin = async () => {
    if (!tenDanhMuc?.trim()) {
      setError('Tên danh mục không được để trống');
      return;
    } else {
      const danhMuc = new DanhMuc(tenDanhMuc, id_NhaHang);
      try {
        if (idDanhMucUd) {
          await dispatch(capNhatDanhMucThunk({id: idDanhMucUd, danhMuc}));
        } else {
          await dispatch(themDanhMucThunk(danhMuc)).unwrap();
        }
        onActionComplete(true, 'Cập nhật danh mục thành công!');
        // onClose();
      } catch (e: any) {
        setError(e.msg || 'Đã xảy ra lỗi');
      } finally {
        setError(null);
        onClose();
      }
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {idDanhMucUd ? 'Cập nhật danh mục' : 'Thêm danh mục'}
          </Text>
          <Text style={styles.tieuDe}>Danh mục</Text>
          <TextInput
            style={styles.input}
            value={tenDanhMuc}
            onChangeText={text => {
              setTenDanhMuc(text);
            }}
            placeholder="Nhập tên danh mục"
            placeholderTextColor="gray"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={luuThongTin}>
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalThemSuaDanhMuc;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'gray',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 90,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: '#ff7a45',
    borderRadius: 12,
    width: 130,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  tieuDe: {
    textAlign: 'left',
    width: '100%',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
  },
});
