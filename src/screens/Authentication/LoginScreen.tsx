import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {checkLogin, checkPhoneNumber} from './CallApiLogin';
import EncryptedStorage from 'react-native-encrypted-storage';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/Slices/UserSlice';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispath = useDispatch();

  const navigation = useNavigation();

  const handleLoginOTP = async () => {
    try {
      const result = await checkPhoneNumber(phoneNumber);
      if (result.statusError === '404') {
        // setErrorMessage(response.massage)
        setErrorMessage(result.message);
        return;
      }
      if (result.statusError === '403') {
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
      }
    } catch (error) {
      console.log('Error code: ', error);
      setErrorMessage('Có lỗi xảy ra khi gửi OTP.');
    }
  };

  const confirmCode = async () => {
    try {
      if (confirm) {
        const userCredential = await confirm.confirm(code);
        const idToken = await userCredential.user.getIdToken(true);

        const result = await checkLogin(idToken);

        const {nhanVien, token, refreshToken} = result;

        await EncryptedStorage.setItem('nhanVien', JSON.stringify(nhanVien));
        await EncryptedStorage.setItem('token', JSON.stringify(token));
        await EncryptedStorage.setItem(
          'refreshToken',
          JSON.stringify(refreshToken),
        );

        console.log("Nhan viên"+nhanVien);
      
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

        navigation.navigate('Drawer', {nhanVien});
      }
    } catch (error) {
      console.log('Error code: ', error);
      setErrorMessage('OTP không chính xác. Vui lòng thử lại.');
    }
  };

  return (
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
              placeholder="Nhập OTP"
              value={code}
              onChangeText={setCode}
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.loginButton} onPress={confirmCode}>
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </>
        )}
        {errorMessage && <Text style={styles.message}>{errorMessage}</Text>}
      </View>
    </View>
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
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    marginBottom: 10,
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
});

export default LoginScreen;
