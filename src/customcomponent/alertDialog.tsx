import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import PropTypes from 'prop-types';  // Import thư viện PropTypes

const AlertDialog = ({ isSuccess, message}) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <View style={[styles.alertContainer, isSuccess ? styles.successBorder : styles.errorBorder]}>
            <View style={styles.contentWrapper}>
                <View style={[styles.iconCircle, isSuccess ? styles.successBackground : styles.errorBackground]}>
                    <FontAwesomeIcon 
                        icon={isSuccess ? faCheckCircle : faTimesCircle} 
                        size={20} 
                        color={isSuccess ? '#12B76A' : '#F04438'} 
                    />
                </View>
                <Text style={styles.messageText}>
                    {message} {/* Sử dụng message được truyền vào */}
                </Text>
            </View>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                <FontAwesomeIcon icon={faTimesCircle} size={20} color={'#667085'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 50, // Bo tròn viền
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    successBorder: {
        borderColor: '#12B76A', // Màu xanh cho thành công
    },
    errorBorder: {
        borderColor: '#F04438', // Màu đỏ cho lỗi
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Đảm bảo phần nội dung chiếm toàn bộ không gian trừ nút đóng
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    successBackground: {
        backgroundColor: '#E6F4EA', // Màu nền xanh nhạt cho thành công
    },
    errorBackground: {
        backgroundColor: '#FEE4E2', // Màu nền đỏ nhạt cho lỗi
    },
    messageText: {
        color: '#344054',
        fontSize: 14,
        flex: 1, // Để đảm bảo văn bản không vượt quá phần diện tích còn lại
    },
    closeButton: {
        padding: 10,
    },
});

export default AlertDialog;
