import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const logout = async () => {
    try {
        await auth().signOut();
        console.log('Đăng xuất thành công');
    } catch (error) {
        console.error('Đăng xuất thất bại:', error);
    }
};

const Detail = ({ user }) => {

    return (
        <View>
            {user.phoneNumber && <Text>Số điện thoại: {user.phoneNumber}</Text>}
            <TouchableOpacity
                onPress={logout}
            >
                <Text >Đăng xuất</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Detail;