import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchNhanViens, NhanVienSlice } from '../../store/NhanVienSlice';



const logout = async () => {
    try {
        await auth().signOut();
        console.log('Đăng xuất thành công');
    } catch (error) {
        console.error('Đăng xuất thất bại:', error);
    }
};


const getIdToken = async (user: any) => {
    const idToken = await user.getIdToken(); // Lấy access token
    // const refreshToken = user.refreshToken; // Lấy refresh token
    console.log('------------------ID Token Firebase ----------------');
    console.log(idToken);
    // console.log(refreshToken);
}



const Detail = ({ user }) => {


    getIdToken(user)

    return (
        <View>
            {/* {user.phoneNumber && <Text>Số điện thoại: {user.phoneNumber}</Text>} */}

            <TouchableOpacity
                onPress={logout}
            >
                <Text >Đăng xuất</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Detail;