import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { fetchNhanViens, NhanVienSlice } from '../../store/NhanVienSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(true);
    const [filterNhanVienList, setFilterNhanVienList] = useState<NhanVienSlice[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const dsNhanVien = useSelector((state: RootState) => state.nhanVien.nhanViens);
    const statusNhanVien = useSelector((state: RootState) => state.nhanVien.status);

    useEffect(() => {
        if (statusNhanVien === 'idle') {
            dispatch(fetchNhanViens());
            setIsLoading(true);
        } else if (statusNhanVien === 'succeeded') {
            setFilterNhanVienList(dsNhanVien || []);
            setIsLoading(false);
        } else if (statusNhanVien === 'failed') {
            setIsLoading(false);
        }
    }, [dispatch, dsNhanVien]);



    const handleLoginOTP = async () => {
        // Kiểm tra số điện thoại có trong danh sách không
        const isPhoneNumberRegistered = filterNhanVienList.some((nv) => nv.soDienThoai === phoneNumber);
        if (!isPhoneNumberRegistered) {
            setErrorMessage('Số điện thoại chưa đăng ký. Vui lòng liên hệ admin.');
            return;
        }
        try {
            const formattedPhoneNumber = phoneNumber.startsWith('0') ? `+84${phoneNumber.substring(1)}` : `+84${phoneNumber}`;
            const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            console.log('Error code: ', error);
            setErrorMessage('Có lỗi xảy ra khi gửi OTP.');
        }
    };

    const confirmCode = async () => {
        try {
            if (confirm) {
                const userCredential = await confirm.confirm(code);
                const user = userCredential.user;
                console.log('Đăng nhập thành công!', user);
                navigation.navigate('Detail'); // Điều hướng sau khi đăng nhập thành công
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
                                onChangeText={setPhoneNumber} // Cập nhật giá trị số điện thoại
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
        flex: 1, // Chiếm toàn bộ không gian còn lại
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
    },
    loginButton: {
        backgroundColor: '#007bff',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 10,
        elevation: 2,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    message: {
        color: 'red',
        width: '90%',
        textAlign: 'center',
    },
});

export default LoginScreen;