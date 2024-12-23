import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {checkLogin, checkPhoneNumber} from './CallApiLogin';
import EncryptedStorage from 'react-native-encrypted-storage';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/Slices/UserSlice';
import {useToast} from '../../customcomponent/CustomToast';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {showToast} = useToast();

  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const dispath = useDispatch();

  const navigation = useNavigation();

  const handleLoginOTP = async () => {
    setIsLoadingModal(true);
    try {
      const result = await checkPhoneNumber(phoneNumber);
      if (result.statusError === '404') {
        // setErrorMessage(response.massage)
        setTimeout(() => {
          setIsLoadingModal(false);
        }, 2000);
        setErrorMessage(result.message);
        return;
      }
      if (result.statusError === '403') {
        setTimeout(() => {
          setIsLoadingModal(false);
        }, 2000);
        setErrorMessage(result.message);
      } else {
        setErrorMessage('');
        const formattedPhoneNumber = phoneNumber.startsWith('0')
          ? `+84${phoneNumber.substring(1)}`
          : `+84${phoneNumber}`;
        const confirmationResult = await auth().signInWithPhoneNumber(
          formattedPhoneNumber,
        );
        setConfirm(confirmationResult);
        setIsLoadingModal(false);
      }
    } catch (error) {
      setTimeout(() => {
        setIsLoadingModal(false);
      }, 2000);
      console.log('Error code: ', error);
      setErrorMessage('Có lỗi xảy ra khi gửi OTP.');
    }
  };

  const confirmCode = async () => {
    try {
      setIsLoadingLogin(true);
      if (confirm) {
        const userCredential = await confirm.confirm(code);
        const idToken = await userCredential.user.getIdToken(true);

        const result = await checkLogin(idToken);

        const {nhanVien, token, refreshToken} = result;
        if (result) {
          setIsLoadingLogin(false);
          setTimeout(() => {
            showToast('check', 'Đăng nhập thành công', 'white', 1500);
          }, 1000);
        } else {
          setTimeout(() => {
            setIsLoadingLogin(false);
          }, 2000);
        }

        await EncryptedStorage.setItem('nhanVien', JSON.stringify(nhanVien));
        await EncryptedStorage.setItem('token', JSON.stringify(token));
        await EncryptedStorage.setItem(
          'refreshToken',
          JSON.stringify(refreshToken),
        );

        console.log('Nhan viên' + nhanVien);

        dispath(setUser(nhanVien));

        // Tạo thời gian hết hạn là 23:59 hôm nay
        const expirationTime = moment().endOf('day').toISOString();

        // Lưu token và thời gian hết hạn
        await EncryptedStorage.setItem(
          'userSession',
          JSON.stringify({
            token: idToken,
            expirationTime: expirationTime,
          }),
        );

        if (
          nhanVien.vaiTro != 'Nhân viên phục vụ' &&
          nhanVien.vaiTro !== 'Đầu bếp'
        ) {
          navigation.navigate('Drawer', {nhanVien});
        } else {
          navigation.navigate('BottomTabs', {nhanVien});
        }
      }
    } catch (error) {
      console.log('Error code: ', error);
      setErrorMessage('OTP không chính xác. Vui lòng thử lại.');
    }
  };

  return (
    <>
      <View style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <Text style={styles.textUser}>Xin chào</Text>
            <Text style={styles.textMess}>Vui lòng đăng nhập để tiếp tục.</Text>
          </View>
          <Image source={require('../../image/logo.png')} style={styles.logo} />
          {confirm == null ? (
            <>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.phonePrefix}>+84</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập số điện thoại"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  autoCapitalize="none"
                  placeholderTextColor="#aaa"
                  keyboardType="phone-pad"
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLoginOTP}>
                <Text style={styles.loginButtonText}>Gửi OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={styles.inputOTP}
                placeholder="Nhập mã OTP"
                value={code}
                onChangeText={setCode}
                autoCapitalize="none"
                placeholderTextColor="#aaa"
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={confirmCode}>
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </>
          )}
          {errorMessage && <Text style={styles.message}>{errorMessage}</Text>}
        </View>
      </View>
      <Modal visible={isLoadingModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Đang gửi mã OTP...</Text>
        </View>
      </Modal>
      <Modal visible={isLoadingLogin} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Đang đăng nhập...</Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  phonePrefix: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  inputOTP: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 25,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  welcome: {
    position: 'absolute',
    top: '6%',
    left: 20,
  },
  textUser: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
  },
  textMess: {
    color: 'gray',
    fontSize: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
