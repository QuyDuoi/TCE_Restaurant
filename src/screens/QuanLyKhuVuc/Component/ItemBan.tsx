import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Ban} from '../../../store/Slices/BanSlice';
import ModalShowQrCode from '../ComponentModal/ModalShowQrCode';
import ModalThemSuaBan from '../ComponentModal/ModalThemSuaBan';
import DeletePostModal from '../../../customcomponent/modalDelete';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {xoaBan} from '../../../store/Thunks/banThunks';
import {UserLogin} from '../../../navigation/CustomDrawer';

interface Props {
  ban: Ban;
  onPress?: () => void;
  onDeleteBan?: (banId: string) => void; // Callback khi xóa bàn
}

const ItemBan = (props: Props) => {
  const {ban, onPress, onDeleteBan} = props;
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái mở/đóng
  const slideAnim = useRef(new Animated.Value(0)).current; // Animation trượt
  const [isModalQRCode, setIsModalQRCode] = useState(false);
  const [isModalSuaBan, setIsModalSuaBan] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user: UserLogin = useSelector(state => state.user);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const id_nhanVien = user._id;
  const id_nhaHang = user.id_nhaHang._id;

  // Hàm xử lý hiệu ứng trượt
  const toggleExpand = () => {
    if (isExpanded) {
      // Thu lại
      Animated.timing(slideAnim, {
        toValue: 0, // Quay về vị trí ban đầu
        duration: 350,
        useNativeDriver: true,
      }).start(() => setIsExpanded(false));
    } else {
      // Mở ra
      Animated.timing(slideAnim, {
        toValue: -80, // Trượt sang trái
        duration: 350,
        useNativeDriver: true,
      }).start(() => setIsExpanded(true));
    }
  };

  const hanldXoaBan = async () => {
    try {
      await dispatch(
        xoaBan({id_Ban: ban._id, id_nhanVien, id_nhaHang}),
      ).unwrap(); // unwrap() để truy cập trực tiếp dữ liệu phản hồi hoặc lỗi
      ToastAndroid.show(
        `Xóa bàn "${ban.tenBan}" thành công!`,
        ToastAndroid.SHORT,
      );
      setIsModalDeleteVisible(false); // Đóng modal
      if (onDeleteBan) {
        onDeleteBan(ban._id);
      }
    } catch (error: any) {
      console.error('Error deleting ban:', error);
      ToastAndroid.show(
        error?.msg || 'Có lỗi xảy ra khi xóa bàn. Vui lòng thử lại!',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        toggleExpand(); // Hiệu ứng trượt
        if (onPress) {
          onPress(); // Gọi sự kiện onPress từ props
        }
      }}
      activeOpacity={0.6}>
      <View style={styles.container}>
        {/* Nội dung bàn */}
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{translateX: slideAnim}], // Áp dụng hiệu ứng trượt
            },
          ]}>
          {ban.maQRCode ? (
            <Image source={{uri: ban.maQRCode}} style={styles.qrImage} />
          ) : (
            <Image
              style={styles.imageNoQR}
              source={require('../../../image/QRCode.jpg')}
            />
          )}
          <View style={styles.info}>
            <RowComponent justify="flex-start">
              <TextComponent
                text={`${ban.tenBan.length === 1 ? 'Bàn ' : ''}`}
                color={colors.black}
                fontWeight="bold"
                size={16}
              />
              <TextComponent
                text={ban.tenBan || 'Ngoài đường'}
                size={16}
                color={colors.black}
                fontWeight="bold"
              />
            </RowComponent>
            <TextComponent
              text={`Sức chứa: ${ban.sucChua || 100} người`}
              size={15}
              color="black"
            />
            <TextComponent
              text={`Mật khẩu: ${ban.matKhau || 100}`}
              size={15}
              color="black"
            />
          </View>
        </Animated.View>

        {/* Nút tương tác */}
        {isExpanded && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsModalQRCode(true)}>
              <Icon name="qrcode" size={24} color="white" />
            </TouchableOpacity>
            {user.vaiTro === 'Quản lý' && (
              <>
                <TouchableOpacity
                  style={[styles.actionButton, {backgroundColor: 'green'}]}
                  onPress={() => {
                    setIsModalSuaBan(true);
                  }}>
                  <Icon name="pencil" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, {backgroundColor: 'red'}]}
                  onPress={() => {
                    setIsModalDeleteVisible(true);
                  }}>
                  <Icon name="trash-o" size={24} color="white" />
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>

      {/* Modals */}
      <ModalShowQrCode
        visible={isModalQRCode}
        onClose={() => {
          setIsModalQRCode(false);
        }}
        maQRCode={ban.maQRCode}
      />
      <ModalThemSuaBan
        visible={isModalSuaBan}
        onClose={() => {
          setIsModalSuaBan(false);
        }}
        banData={ban}
        onActionComplete={(success, message) => {
          ToastAndroid.show(message, ToastAndroid.SHORT);
          setIsModalSuaBan(false);
        }}
      />
      <DeletePostModal
        title="Xóa Bàn"
        content={`Bạn có chắc chắn muốn xóa bàn "${ban.tenBan}"?`}
        onDelete={hanldXoaBan}
        onCancel={() => setIsModalDeleteVisible(false)}
        visible={isModalDeleteVisible}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden', // Giới hạn nội dung khi trượt
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  qrImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  imageNoQR: {
    width: 60,
    height: 60,
    borderColor: 'black',
    borderWidth: 0.5,
    marginRight: 10,
  },
  info: {
    flex: 1,
    paddingVertical: 5,
  },
  actions: {
    position: 'absolute',
    right: 10,
    top: '50%',
    flexDirection: 'row',
    transform: [{translateY: -15}], // Căn giữa theo chiều dọc
  },
  actionButton: {
    width: 40,
    height: 40,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
  },
});

export default ItemBan;
