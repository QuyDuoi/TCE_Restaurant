import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import type {AppDispatch} from '../../../store/store';
import {useDispatch} from 'react-redux';
import {
  capNhatKhuVucThunk,
  themKhuVucThunk,
} from '../../../store/Thunks/khuVucThunks';
import KhuVuc from '../../../services/models/KhuVucModel';

interface KhuVucModalProps {
  visible: boolean;
  onClose: () => void;
  idKhuVucUd?: string;
  tenKhuVucUd?: string;
  onActionComplete: (success: boolean, message: string) => void;
}

function ModalThemSuaKhuVuc(props: KhuVucModalProps): React.JSX.Element {
  const {visible, onClose, idKhuVucUd, tenKhuVucUd, onActionComplete} = props;
  const [tenKhuVuc, setTenKhuVuc] = useState(idKhuVucUd ? tenKhuVucUd : '');
  const [error, setError] = useState<string | null>(null);
  const id_nhaHang = '66fab50fa28ec489c7137537';
  const dispatch = useDispatch<AppDispatch>();

  const reset = () => {
    setError('');
    setTenKhuVuc('');
  };

  useEffect(() => {
    if (idKhuVucUd && tenKhuVucUd) {
      setTenKhuVuc(tenKhuVucUd);
    } else {
      setTenKhuVuc('');
    }
  }, [idKhuVucUd, tenKhuVucUd]);

  const luuThongTin = async () => {
    if (!tenKhuVuc?.trim()) {
      setError('Tên khu vực không được để trống');
      return;
    } else {
      const khuVuc = new KhuVuc(tenKhuVuc, id_nhaHang);

      try {
        if (idKhuVucUd) {
          await dispatch(capNhatKhuVucThunk({id: idKhuVucUd, khuVuc})).unwrap();
          reset();
          onActionComplete(true, 'Cập nhật khu vực thành công!');
        } else {
          await dispatch(themKhuVucThunk(khuVuc)).unwrap();
          reset();
          onActionComplete(true, 'Thêm khu vực thành công!');
        }
      } catch (error: any) {
        setError(error);
        // onActionComplete(false, error);
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
            {idKhuVucUd ? 'Cập nhật khu vực' : 'Thêm khu vực'}
          </Text>
          <Text style={styles.tieuDe}>Khu vực</Text>
          <TextInput
            style={styles.input}
            value={tenKhuVuc}
            onChangeText={text => {
              setTenKhuVuc(text);
            }}
            placeholder="Nhập tên khu vực"
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

export default ModalThemSuaKhuVuc;

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
