import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { checkLoginThunk, fetchNhanViens, loginNhanVienThunk, NhanVienSlice } from '../../store/NhanVienSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { WebView } from 'react-native-webview';
import { RecaptchaVerifier } from 'firebase/auth';
import { authcn } from './AuthContext'; // Đảm bảo đường dẫn chính xác


const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const webviewRef = useRef(null);

    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();

    const handleLoginOTP = async () => {
        try {
            const resultAction = await dispatch(checkLoginThunk(phoneNumber));
            if (checkLoginThunk.fulfilled.match(resultAction)) {
                const response = resultAction.payload;
                if (response.statusError === "404") {
                    // setErrorMessage(response.massage)
                    setErrorMessage(response.message);
                    return;
                }
                if (response.statusError === "403") {
                    setErrorMessage(response.message);
                }
                else {
                    const formattedPhoneNumber = phoneNumber.startsWith('0') ? `+84${phoneNumber.substring(1)}` : `+84${phoneNumber}`;
                    const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
                    setConfirm(confirmation);
                }
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
                const idToken = await userCredential.user.getIdToken();
                console.log('Token: ', idToken);
                console.log('Đăng nhập thành công!');
                dispatch(loginNhanVienThunk(idToken));
                navigation.navigate('Detail');
            }
        } catch (error) {
            console.log('Error code: ', error);
            setErrorMessage('OTP không chính xác. Vui lòng thử lại.');
        }
    };

    return (
        <ImageBackground source={{ uri: 'https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-06.jpg' }} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20240618/original/pngtree-restaurant-logo-vector-png-image_15358605.png' }} style={styles.logo} />
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
                            onPress={handleLoginOTP}
                        >
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
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={confirmCode}
                        >
                            <Text style={styles.loginButtonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </>
                )}
                {errorMessage && (
                    <Text style={styles.message}>{errorMessage}</Text>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
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
        width: 120,
        height: 120,
        marginBottom: 30,
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
});

export default LoginScreen;
